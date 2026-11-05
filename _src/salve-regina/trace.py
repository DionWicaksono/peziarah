"""Trace the white lines of the drawing into smooth, spaced polylines for text-on-path."""
import json, sys
import numpy as np
from PIL import Image, ImageDraw
from skimage.morphology import skeletonize
from scipy import ndimage
from skan import Skeleton

SRC, OUT, PREVIEW = sys.argv[1], sys.argv[2], sys.argv[3]
MIN_SEP = float(sys.argv[4]) if len(sys.argv) > 4 else 6.0
MIN_LEN = 12.0

a = np.asarray(Image.open(SRC).convert('L'), dtype=np.float32)
H, W = a.shape
from skimage.filters import sato
from skimage.measure import find_contours
ridge = sato(a / 255.0, sigmas=[0.8, 1.2], black_ridges=False)
lines = ridge > 0.07
lines = ndimage.binary_opening(lines, structure=np.ones((2, 2))) | (ridge > 0.15)
skel = skeletonize(lines)
# silhouette: outline of the whole figure, set first so the profile always reads
dens = ndimage.gaussian_filter((a > 60).astype(np.float32), 3.0)
sil = max(find_contours(dens, 0.12), key=len)[:, ::-1]

sk = Skeleton(skel)
paths = []
for i in range(sk.n_paths):
    pts = sk.path_coordinates(i).astype(np.float64)  # (row, col)
    if len(pts) < 4:
        continue
    xy = pts[:, ::-1]
    # smooth (moving average) keeping ends
    if len(xy) > 7:
        k = 5
        pad = np.pad(xy, ((k // 2, k // 2), (0, 0)), mode='edge')
        ker = np.ones(k) / k
        xy = np.stack([np.convolve(pad[:, d], ker, mode='valid') for d in range(2)], 1)
    seg = np.linalg.norm(np.diff(xy, axis=0), axis=1)
    L = seg.sum()
    if L < MIN_LEN:
        continue
    # resample every 1px
    s = np.concatenate([[0], np.cumsum(seg)])
    t = np.arange(0, L, 1.0)
    xy = np.stack([np.interp(t, s, xy[:, 0]), np.interp(t, s, xy[:, 1])], 1)
    paths.append(xy)

# join segments whose ends nearly touch and point the same way
def join(paths, gap=5.0, cosmin=0.6):
    from scipy.spatial import cKDTree
    changed = True
    while changed:
        changed = False
        ends = []
        for i, p in enumerate(paths):
            if len(p) < 3: continue
            ends.append((i, 0, p[0], p[0] - p[min(4, len(p)-1)]))
            ends.append((i, 1, p[-1], p[-1] - p[max(-5, -len(p))]))
        if not ends: break
        tree = cKDTree([e[2] for e in ends])
        used = set(); newp = []
        for a_, ea in enumerate(ends):
            ia = ea[0]
            if ia in used: continue
            best = None
            for b_ in tree.query_ball_point(ea[2], gap):
                eb = ends[b_]
                if eb[0] == ia or eb[0] in used: continue
                da = ea[3] / (np.linalg.norm(ea[3]) + 1e-6); db = eb[3] / (np.linalg.norm(eb[3]) + 1e-6)
                if -np.dot(da, db) < cosmin: continue
                dd = np.linalg.norm(ea[2] - eb[2])
                if best is None or dd < best[0]: best = (dd, eb)
            if best is None: continue
            eb = best[1]
            pa = paths[ia] if ea[1] == 1 else paths[ia][::-1]
            pb = paths[eb[0]] if eb[1] == 0 else paths[eb[0]][::-1]
            newp.append(np.vstack([pa, pb])); used.add(ia); used.add(eb[0]); changed = True
        paths = [p for i, p in enumerate(paths) if i not in used] + newp
    return paths

def resample(xy, step=1.0):
    seg = np.linalg.norm(np.diff(xy, axis=0), axis=1)
    s = np.concatenate([[0], np.cumsum(seg)])
    t = np.arange(0, s[-1], step)
    return np.stack([np.interp(t, s, xy[:, 0]), np.interp(t, s, xy[:, 1])], 1)

paths = [resample(p) for p in join(paths)]
paths = [p for p in paths if len(p) >= MIN_LEN]
sil = resample(sil)
# drop the silhouette's bottom/right edges that run along the image cut (keep profile side)
paths.sort(key=len, reverse=True)
paths = [sil] + paths

# greedy spacing: longest first, keep runs that stay MIN_SEP away from accepted lines
paths.sort(key=len, reverse=True)
occ = np.zeros((H, W), bool)
dist = np.full((H, W), 1e9, np.float32)
accepted = []
batch = []

def refresh():
    global dist
    dist = ndimage.distance_transform_edt(~occ).astype(np.float32)

for n, xy in enumerate(paths):
    if n % 40 == 0 and batch:
        refresh(); batch.clear()
    xi = np.clip(np.round(xy[:, 0]).astype(int), 0, W - 1)
    yi = np.clip(np.round(xy[:, 1]).astype(int), 0, H - 1)
    ok = dist[yi, xi] >= MIN_SEP
    # also check against paths accepted since last refresh (cheap: exact distance to their points)
    if batch:
        bp = np.concatenate(batch)
        from scipy.spatial import cKDTree
        d, _ = cKDTree(bp).query(xy)
        ok &= d >= MIN_SEP
    # split into runs
    idx = np.flatnonzero(np.diff(np.concatenate([[0], ok.astype(int), [0]])))
    for s0, s1 in zip(idx[::2], idx[1::2]):
        run = xy[s0:s1]
        if len(run) < MIN_LEN:
            continue
        accepted.append(run)
        batch.append(run)
        occ[np.clip(np.round(run[:, 1]).astype(int), 0, H - 1), np.clip(np.round(run[:, 0]).astype(int), 0, W - 1)] = True

# orient for reading: left to right overall (vertical-ish: top to bottom)
out = []
total = 0.0
for run in accepted:
    dx, dy = run[-1] - run[0]
    if dx < -abs(dy) * 0.3 or (abs(dx) <= abs(dy) * 0.3 and dy < 0):
        run = run[::-1]
    # simplify: keep every 3rd point (already smooth), always keep last
    keep = run[::3]
    if not np.allclose(keep[-1], run[-1]):
        keep = np.vstack([keep, run[-1]])
    total += np.linalg.norm(np.diff(run, axis=0), axis=1).sum()
    out.append(keep)

# reading order: sort by start y then x
out.sort(key=lambda r: (round(r[0][1] / 12), r[0][0]))
data = {
    'w': W, 'h': H,
    'paths': [[int(round(v * 4)) for p in r for v in p] for r in out],  # quarter-pixel ints
}
json.dump(data, open(OUT, 'w'), separators=(',', ':'))
print('paths', len(out), 'total length', round(total), 'points', sum(len(r) for r in out))

im = Image.new('L', (W, H), 0)
d = ImageDraw.Draw(im)
for r in out:
    d.line([tuple(p) for p in r], fill=255, width=1)
im.save(PREVIEW)
