import { AdditiveBlending, CanvasTexture, InstancedBufferAttribute, InstancedBufferGeometry, LinearFilter, LinearMipmapLinearFilter, LinearSRGBColorSpace, Mesh, NoColorSpace, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Texture, Vector2, Vector3, WebGLRenderTarget, WebGLRenderer } from 'three'
import { MARY_PATHS } from './maryPaths'
import { passageText, type PassageId } from './verses'

/**
 * TransmissionEngine
 *  pass 1 — scripture set along the contour lines of a drawing of Mary. Every glyph is one
 *           instanced quad placed and rotated along a traced line, so the lines of the figure
 *           are the verses themselves. Drawn into a full-resolution target.
 *  pass 2 — composite. A circular "decoder lens" around the pointer shows the original drawing
 *           with chromatic aberration; decode grows the lens until the drawing fills the stage.
 *  The view zooms from the whole figure (text too small to read, so it reads as engraving)
 *  into the face and along the veil, where the words become legible.
 */

const EM = 4 // text size in source pixels; the traced lines are 4.5px apart
const ADV = EM * 0.6 // monospace advance
const ATLAS_CW = 40
const ATLAS_CH = 64
const ATLAS_FONT = 50
const ATLAS_COLS = 8

// figure bounds in source pixels (drawing is 1254 × 1254)
const FIG = { x0: 274, y0: 164, x1: 1056, y1: 1130 }
const FIG_C = { x: (FIG.x0 + FIG.x1) / 2, y: (FIG.y0 + FIG.y1) / 2 }
const FACE = { x: 455, y: 470 } // where the zoom lands: eye, cheek and lips
const VEIL = { x: 760, y: 830 } // where reading drifts to: the folds over the shoulder

const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

const GLYPH_VERT = /* glsl */ `
attribute vec2 aPos;
attribute float aAngle;
attribute float aGlyph;
attribute float aKey;
attribute float aSeed;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uScale;
uniform vec2 uQuad;
uniform float uWrite;
uniform vec2 uPointer;
uniform float uGlowR;
uniform float uRing;
uniform float uRingAmp;
uniform float uRingW;
uniform float uTime;
uniform float uFlicker;
uniform float uGlyphs;
uniform vec2 uGrid;
varying vec2 vUv;
varying float vAlpha;
varying float vHeat;
varying float vGlow;

float hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

vec2 toScreen(vec2 src) {
  vec2 v = (src - uCenter) * uScale;
  return vec2(v.x, -v.y) + uRes * 0.5;
}

void main() {
  vec2 sp = toScreen(aPos);
  float dp = length(sp - uPointer);
  float glow = uGlowR > 0.0 ? smoothstep(uGlowR * 2.2, uGlowR * 0.6, dp) : 0.0;
  float ring = exp(-pow((dp - uRing) / uRingW, 2.0)) * uRingAmp;

  float tick = floor(uTime * 14.0);
  float h = hash21(vec2(aSeed, tick * 0.37));
  float scramble = step(1.0 - clamp(ring * 0.95 + uFlicker * 0.003, 0.0, 1.0), h);
  float g = mix(aGlyph, 1.0 + floor(hash21(vec2(aSeed * 3.1, tick)) * (uGlyphs - 1.0)), scramble);

  float w = smoothstep(aKey - 0.035, aKey, uWrite);

  // local quad corner in source pixels (y down), rotated along the line
  vec2 q = vec2(position.x, -position.y) * uQuad * mix(0.4, 1.0, w) * (1.0 + ring * 0.35);
  float c = cos(aAngle), s = sin(aAngle);
  vec2 r = vec2(c * q.x - s * q.y, s * q.x + c * q.y);
  vec2 v = toScreen(aPos + r);
  gl_Position = vec4(v / uRes * 2.0 - 1.0, 0.0, 1.0);

  float col = mod(g, uGrid.x);
  float row = floor(g / uGrid.x);
  vUv = (vec2(col, row) + vec2(position.x + 0.5, 0.5 - position.y)) / uGrid;
  vAlpha = w;
  vHeat = clamp(glow * 0.8 + ring * 1.2 + scramble * 0.6, 0.0, 1.0);
  vGlow = glow;
}`

const GLYPH_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uAtlas;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform float uGain;
varying vec2 vUv;
varying float vAlpha;
varying float vHeat;
varying float vGlow;
void main() {
  float g = texture2D(uAtlas, vUv).r;
  float a = clamp(g * uGain, 0.0, 1.0) * vAlpha;
  vec3 col = mix(uInk, uAccent, vHeat) * (0.85 + vGlow * 0.35);
  gl_FragColor = vec4(col * a, 1.0);
}`

const QUAD_VERT = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`

const COMPOSITE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uText;
uniform sampler2D uImage;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uScale;
uniform vec2 uImgSize;
uniform vec2 uLensC;
uniform float uLensR;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uBg;

float img(vec2 src) {
  vec2 uv = vec2(src.x / uImgSize.x, 1.0 - src.y / uImgSize.y);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0;
  return texture2D(uImage, uv).r;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec3 col = texture2D(uText, frag / uRes).rgb;

  // decoder lens: the original drawing, with chromatic aberration near the rim
  vec2 lv = frag - uLensC;
  float ld = length(lv);
  if (uLensR > 0.5) {
    float inside = 1.0 - smoothstep(uLensR - 1.5, uLensR + 1.5, ld);
    vec2 dir = lv / max(ld, 1e-3);
    float edge = smoothstep(uLensR * 0.55, uLensR, ld);
    vec2 src = vec2(frag.x - uRes.x * 0.5, uRes.y * 0.5 - frag.y) / uScale + uCenter;
    vec2 off = vec2(dir.x, -dir.y) * edge * 1.5 / uScale;
    vec3 real = vec3(img(src - off), img(src), img(src + off)) * uInk;
    col = mix(col, real, inside);
    float rim = smoothstep(1.6, 0.0, abs(ld - uLensR));
    col += uAccent * rim * 0.45;
  }

  // soft vignette, then screen the light onto the ink ground (#1A1712) so the canvas meets the page
  vec2 q = frag / uRes - 0.5;
  col *= 1.0 - dot(q, q) * 0.9;
  col = uBg + clamp(col, 0.0, 1.0) * (1.0 - uBg);
  gl_FragColor = vec4(col, 1.0);
}`

export type EngineStats = { fps: number; zoom: number; textPx: number; glyphs: number; cx: number; cy: number }

export class TransmissionEngine {
  private renderer: WebGLRenderer
  private camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private textScene = new Scene()
  private compScene = new Scene()
  private textRT: WebGLRenderTarget
  private glyphMat: ShaderMaterial
  private compMat: ShaderMaterial
  private glyphMesh: Mesh | null = null
  private compQuad: Mesh
  private atlas: CanvasTexture | null = null
  private image: Texture
  private paths: Float32Array[]
  private raf = 0
  private running = false
  private start = performance.now()
  private last = performance.now()
  private frameTimes: number[] = []
  private dpr = 1
  private w = 1
  private h = 1
  private fit = 1 // CSS px per source px with the whole figure in view
  private staticMode = false
  private dirty = true
  private font: string
  private write = 0
  private view = { cx: FIG_C.x, cy: FIG_C.y, z: 1 }

  // inputs (CSS px unless noted)
  state = {
    focus: 0, // 0..1 zoom from the whole figure to legible text at the face
    read: 0, // 0..1 drift from the face down the veil
    panX: 0, // drag offset, source px
    panY: 0,
    lensR: 0, // target lens radius (CSS px)
    decode: 0, // 0..1 lens grows to fill the screen, view returns to the whole figure
  }
  private pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, r: 0 }
  private ring = { r: 0, amp: 0 }
  stats: EngineStats = { fps: 60, zoom: 1, textPx: 3, glyphs: 0, cx: FIG_C.x, cy: FIG_C.y }

  constructor(private canvas: HTMLCanvasElement, opts: { font: string; image: HTMLImageElement }) {
    this.font = opts.font
    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
    this.renderer.outputColorSpace = LinearSRGBColorSpace
    this.renderer.setClearColor(0x000000, 1)
    this.textRT = new WebGLRenderTarget(2, 2, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
    })

    this.image = new Texture(opts.image)
    this.image.colorSpace = NoColorSpace
    this.image.minFilter = LinearMipmapLinearFilter
    this.image.magFilter = LinearFilter
    this.image.needsUpdate = true

    this.paths = MARY_PATHS.paths.map((p) => Float32Array.from(p, (v) => v / 4))

    this.glyphMat = new ShaderMaterial({
      vertexShader: GLYPH_VERT,
      fragmentShader: GLYPH_FRAG,
      uniforms: {
        uAtlas: { value: null },
        uRes: { value: new Vector2(2, 2) },
        uCenter: { value: new Vector2(FIG_C.x, FIG_C.y) },
        uScale: { value: 1 },
        uQuad: { value: new Vector2((EM * ATLAS_CW) / ATLAS_FONT, (EM * ATLAS_CH) / ATLAS_FONT) },
        uWrite: { value: 0 },
        uPointer: { value: new Vector2(-9999, -9999) },
        uGlowR: { value: 0 },
        uRing: { value: 0 },
        uRingAmp: { value: 0 },
        uRingW: { value: 40 },
        uTime: { value: 0 },
        uFlicker: { value: 1 },
        uGlyphs: { value: 1 },
        uGrid: { value: new Vector2(1, 1) },
        uInk: { value: new Vector3(0.969, 0.953, 0.918) }, // paper #F7F3EA
        uAccent: { value: new Vector3(0.788, 0.894, 0.357) }, // lime #C9E45B
        uGain: { value: 1 },
      },
      blending: AdditiveBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    this.compMat = new ShaderMaterial({
      vertexShader: QUAD_VERT,
      fragmentShader: COMPOSITE_FRAG,
      uniforms: {
        uText: { value: this.textRT.texture },
        uImage: { value: this.image },
        uRes: { value: new Vector2(2, 2) },
        uCenter: { value: new Vector2(FIG_C.x, FIG_C.y) },
        uScale: { value: 1 },
        uImgSize: { value: new Vector2(MARY_PATHS.w, MARY_PATHS.h) },
        uLensC: { value: new Vector2() },
        uLensR: { value: 0 },
        uInk: { value: new Vector3(0.969, 0.953, 0.918) }, // paper #F7F3EA
        uAccent: { value: new Vector3(0.788, 0.894, 0.357) }, // lime #C9E45B
        uBg: { value: new Vector3(0.102, 0.09, 0.071) }, // ink #1A1712
      },
      depthTest: false,
      depthWrite: false,
    })
    this.compQuad = new Mesh(new PlaneGeometry(2, 2), this.compMat)
    this.compScene.add(this.compQuad)

    this.setPassage('mary')
  }

  /** Lay a passage along the lines: builds the glyph atlas and one instance per letter. */
  setPassage(id: PassageId) {
    const text = [...passageText(id)]
    const chars = [' ', ...new Set(text.filter((c) => c !== ' '))]
    const index = new Map(chars.map((c, i) => [c, i]))
    this.buildAtlas(chars)

    // walk every line, placing one glyph per advance; the stream continues from line to line
    const pos: number[] = []
    const ang: number[] = []
    const gly: number[] = []
    const key: number[] = []
    const seed: number[] = []
    let k = 0
    const span = FIG.y1 - FIG.y0
    for (const p of this.paths) {
      const n = p.length / 2
      const cum = new Float32Array(n)
      for (let i = 1; i < n; i++) cum[i] = cum[i - 1] + Math.hypot(p[i * 2] - p[i * 2 - 2], p[i * 2 + 1] - p[i * 2 - 1])
      const L = cum[n - 1]
      if (L < ADV * 2) continue
      let seg = 0
      const at = (s: number) => {
        s = Math.max(0, Math.min(L, s))
        while (seg > 0 && cum[seg] > s) seg--
        while (seg < n - 2 && cum[seg + 1] < s) seg++
        const t = (s - cum[seg]) / Math.max(1e-6, cum[seg + 1] - cum[seg])
        return [p[seg * 2] + (p[seg * 2 + 2] - p[seg * 2]) * t, p[seg * 2 + 1] + (p[seg * 2 + 3] - p[seg * 2 + 1]) * t]
      }
      const delay = ((p[1] - FIG.y0) / span) * 0.55
      for (let s = ADV / 2; s <= L - ADV / 2; s += ADV) {
        const ch = text[k++ % text.length]
        if (ch === ' ') continue
        const [ax, ay] = at(s - ADV * 0.5)
        const [bx, by] = at(s + ADV * 0.5)
        const [cx, cy] = at(s)
        pos.push(cx, cy)
        ang.push(Math.atan2(by - ay, bx - ax))
        gly.push(index.get(ch) ?? 0)
        key.push(delay + 0.4 * (s / L))
        seed.push(Math.random() * 100)
      }
      k++ // a space between lines, so words don't run across a break
    }

    const geo = new InstancedBufferGeometry()
    const base = new PlaneGeometry(1, 1)
    geo.index = base.index
    geo.setAttribute('position', base.getAttribute('position'))
    geo.setAttribute('aPos', new InstancedBufferAttribute(new Float32Array(pos), 2))
    geo.setAttribute('aAngle', new InstancedBufferAttribute(new Float32Array(ang), 1))
    geo.setAttribute('aGlyph', new InstancedBufferAttribute(new Float32Array(gly), 1))
    geo.setAttribute('aKey', new InstancedBufferAttribute(new Float32Array(key), 1))
    geo.setAttribute('aSeed', new InstancedBufferAttribute(new Float32Array(seed), 1))
    geo.instanceCount = gly.length

    if (this.glyphMesh) {
      this.textScene.remove(this.glyphMesh)
      this.glyphMesh.geometry.dispose()
    }
    this.glyphMesh = new Mesh(geo, this.glyphMat)
    this.glyphMesh.frustumCulled = false
    this.textScene.add(this.glyphMesh)
    this.stats.glyphs = gly.length
    this.write = this.staticMode ? 1.1 : 0 // the new passage writes itself in
    this.dirty = true
  }

  private buildAtlas(chars: string[]) {
    const rows = Math.ceil(chars.length / ATLAS_COLS)
    const c = document.createElement('canvas')
    c.width = ATLAS_CW * ATLAS_COLS
    c.height = ATLAS_CH * rows
    const g = c.getContext('2d')!
    g.fillStyle = '#000'
    g.fillRect(0, 0, c.width, c.height)
    g.fillStyle = '#fff'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.font = `400 ${ATLAS_FONT}px ${this.font}`
    chars.forEach((chr, i) => {
      const col = i % ATLAS_COLS
      const row = Math.floor(i / ATLAS_COLS)
      g.fillText(chr, col * ATLAS_CW + ATLAS_CW / 2, row * ATLAS_CH + ATLAS_CH / 2 + 2)
    })
    this.atlas?.dispose()
    this.atlas = new CanvasTexture(c)
    this.atlas.flipY = false
    this.atlas.colorSpace = NoColorSpace
    this.atlas.minFilter = LinearMipmapLinearFilter
    this.atlas.magFilter = LinearFilter
    this.atlas.generateMipmaps = true
    const u = this.glyphMat.uniforms
    u.uAtlas.value = this.atlas
    u.uGlyphs.value = chars.length
    u.uGrid.value.set(ATLAS_COLS, rows)
  }

  resize(w: number, h: number) {
    this.w = Math.max(1, w)
    this.h = Math.max(1, h)
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.fit = Math.min((this.w * 0.9) / (FIG.x1 - FIG.x0), (this.h * 0.84) / (FIG.y1 - FIG.y0))
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.w, this.h, false)
    const dw = Math.round(this.w * this.dpr)
    const dh = Math.round(this.h * this.dpr)
    this.textRT.setSize(dw, dh)
    this.glyphMat.uniforms.uRes.value.set(dw, dh)
    this.compMat.uniforms.uRes.value.set(dw, dh)
    this.dirty = true
  }

  setStatic(v: boolean) {
    this.staticMode = v
    this.glyphMat.uniforms.uFlicker.value = v ? 0 : 1
    if (v) this.write = 1.1
    this.dirty = true
  }

  setState(s: Partial<TransmissionEngine['state']>) {
    Object.assign(this.state, s)
    this.dirty = true
  }

  setPointer(x: number, y: number, active: boolean) {
    this.pointer.x = x
    this.pointer.y = y
    if (this.pointer.sx < -999) {
      this.pointer.sx = x
      this.pointer.sy = y
    }
    this.state.lensR = active ? (this.w < 700 ? 88 : 128) : 0
    this.dirty = true
  }

  /** Drag to look around: CSS px of pointer movement. */
  nudgePan(dx: number, dy: number) {
    const k = 1 / (this.fit * Math.max(1, this.view.z))
    this.state.panX = Math.max(-260, Math.min(260, this.state.panX - dx * k))
    this.state.panY = Math.max(-260, Math.min(260, this.state.panY - dy * k))
    this.dirty = true
  }

  pulseAt(x: number, y: number) {
    this.pointer.x = x
    this.pointer.y = y
    this.ring.r = 0
    this.ring.amp = 1
    this.dirty = true
  }

  /** How far the view zooms in: enough for the text to read at about 13 CSS px. */
  private zoomMax() {
    return Math.max(1.5, 13 / (EM * this.fit))
  }

  private frame(now: number) {
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    const t = (now - this.start) / 1000

    this.frameTimes.push(dt)
    if (this.frameTimes.length > 40) {
      const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
      this.frameTimes.length = 0
      this.stats.fps = Math.round(1 / Math.max(avg, 1e-3))
    }

    // intro / passage change: the lines write themselves top to bottom
    if (this.write < 1.1) this.write = this.staticMode ? 1.1 : Math.min(1.1, this.write + dt / 2.6)

    // view: whole figure → face (focus) → down the veil (read) → whole figure again (decode)
    const st = this.state
    const back = smoothstep(0, 0.7, st.decode)
    const focus = st.focus * (1 - back)
    const zt = 1 + (this.zoomMax() - 1) * focus
    const fx = FACE.x + (VEIL.x - FACE.x) * st.read
    const fy = FACE.y + (VEIL.y - FACE.y) * st.read
    const panK = Math.max(focus, 0.25) * (1 - back)
    const cxt = FIG_C.x + (fx - FIG_C.x) * focus + st.panX * panK
    const cyt = FIG_C.y + (fy - FIG_C.y) * focus + st.panY * panK
    const vk = this.staticMode ? 1 : 1 - Math.pow(0.004, dt)
    const v = this.view
    v.z += (zt - v.z) * vk
    v.cx += (cxt - v.cx) * vk
    v.cy += (cyt - v.cy) * vk

    const ease = this.staticMode ? 1 : 1 - Math.pow(0.001, dt)
    const p = this.pointer
    p.sx += (p.x - p.sx) * ease
    p.sy += (p.y - p.sy) * ease
    p.r += (st.lensR - p.r) * (this.staticMode ? 1 : 1 - Math.pow(0.02, dt))
    this.ring.r += dt * Math.max(this.w, this.h) * 0.55
    this.ring.amp *= Math.pow(0.3, dt)

    const d = this.dpr
    const scale = this.fit * v.z * d // device px per source px
    const textPx = EM * this.fit * v.z // CSS px
    this.stats.zoom = v.z
    this.stats.textPx = textPx
    this.stats.cx = v.cx
    this.stats.cy = v.cy

    const decode = st.decode
    const diag = Math.hypot(this.w, this.h)
    const cx = p.sx < -999 ? this.w / 2 : p.sx
    const cy = p.sy < -999 ? this.h / 2 : p.sy
    const lensX = cx + (this.w / 2 - cx) * decode
    const lensY = cy + (this.h / 2 - cy) * decode
    const lensR = p.r + (diag * 0.6 - p.r) * decode

    const g = this.glyphMat.uniforms
    g.uCenter.value.set(v.cx, v.cy)
    g.uScale.value = scale
    g.uWrite.value = this.write
    g.uTime.value = this.staticMode ? 0 : t
    g.uPointer.value.set(p.sx * d, (this.h - p.sy) * d)
    g.uGlowR.value = p.r * d
    g.uRing.value = this.ring.r * d
    g.uRingAmp.value = this.ring.amp
    g.uRingW.value = Math.max(24, textPx * 4) * d
    g.uGain.value = 1.2 + 1.6 * (1 - smoothstep(3, 10, textPx)) // small text thins out; lift it

    const c = this.compMat.uniforms
    c.uCenter.value.set(v.cx, v.cy)
    c.uScale.value = scale
    c.uLensC.value.set(lensX * d, (this.h - lensY) * d)
    c.uLensR.value = lensR * d

    this.renderer.setRenderTarget(this.textRT)
    this.renderer.clear()
    this.renderer.render(this.textScene, this.camera)
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.compScene, this.camera)
    this.dirty = false
  }

  private settling() {
    const v = this.view
    const st = this.state
    return (
      Math.abs(this.pointer.r - st.lensR) > 0.5 ||
      this.ring.amp > 0.01 ||
      this.write < 1.1 ||
      Math.abs(v.z - (1 + (this.zoomMax() - 1) * st.focus)) > 0.002
    )
  }

  private loop = (now: number) => {
    if (!this.running) return
    if (!this.staticMode || this.dirty || this.settling()) this.frame(now)
    else this.last = now
    this.raf = requestAnimationFrame(this.loop)
  }

  play() {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.loop)
  }

  pause() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  dispose() {
    this.pause()
    this.textRT.dispose()
    this.glyphMat.dispose()
    this.compMat.dispose()
    this.atlas?.dispose()
    this.image.dispose()
    this.glyphMesh?.geometry.dispose()
    this.compQuad.geometry.dispose()
    this.renderer.dispose()
  }
}
