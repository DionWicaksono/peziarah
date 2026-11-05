/**
 * /salve-regina/ — Maria, digambar dengan Kitab Suci.
 * Binds to markup that is already in the HTML (prerendered); this script only adds the live drawing,
 * the scroll story and the passage switcher. Without JS or WebGL the page shows the still drawing.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { TransmissionEngine } from './TransmissionEngine'
import { PASSAGES, type PassageId } from './verses'

gsap.registerPlugin(ScrollTrigger)

const MONO = '"Space Mono", ui-monospace, monospace'
const root = document.documentElement
const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)

const track = $<HTMLElement>('.tx-track')!
const stage = $<HTMLDivElement>('.tx-stage')!
const canvas = $<HTMLCanvasElement>('.tx-canvas')!
const logEl = $<HTMLPreElement>('.tx-log')!
const statusEl = $<HTMLElement>('[data-tx-status]')!
const dock = $<HTMLElement>('.tx-dock')!
const imageUrl = stage.dataset.drawing!

const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
let reduced = reducedMq.matches
const isTouch = window.matchMedia('(pointer: coarse)').matches
root.classList.toggle('tx-touch', isTouch)

let engine: TransmissionEngine | null = null
let lenis: Lenis | null = null
let st: ScrollTrigger | null = null
let progress = 0
let passage: PassageId = 'mary'

const setStatus = (s: 'loading' | 'ready' | 'failed') => {
  stage.dataset.status = s
  if (s === 'failed') {
    root.classList.remove('tx-live')
    ScrollTrigger.refresh()
  }
}

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
/** Scroll progress → engine state. */
const storyAt = (p: number) => ({ focus: smooth(0.1, 0.42, p), read: smooth(0.42, 0.66, p), decode: smooth(0.66, 0.9, p) })

/** A passage as log lines: the reference, then the verse wrapped to the log's width. */
function passageFeed(id: PassageId, width = 34): string[] {
  const out: string[] = []
  for (const v of PASSAGES[id]) {
    out.push(`> ${v.ref}`)
    let line = ''
    for (const word of v.text.split(' ')) {
      if (line && line.length + 1 + word.length > width) {
        out.push(`  ${line}`)
        line = word
      } else line = line ? `${line} ${word}` : word
    }
    if (line) out.push(`  ${line}`)
    out.push('')
  }
  return out
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/* ------------------------------------------------------------ engine */
function startEngine() {
  const fonts = Promise.race([document.fonts.load(`400 50px ${MONO}`), new Promise((r) => setTimeout(r, 2000))])
  Promise.all([loadImage(imageUrl), fonts])
    .then(([image]) => {
      try {
        engine = new TransmissionEngine(canvas, { font: MONO, image })
      } catch (err) {
        console.warn('[salve-regina] WebGL unavailable', err)
        setStatus('failed')
        return
      }
      engine.setStatic(reduced)
      engine.resize(stage.clientWidth, stage.clientHeight)
      new ResizeObserver(() => engine?.resize(stage.clientWidth, stage.clientHeight)).observe(stage)
      let inView = true
      const onVis = () => (document.hidden || !inView ? engine?.pause() : engine?.play())
      new IntersectionObserver(([e]) => {
        inView = e.isIntersecting
        onVis()
      }).observe(track)
      document.addEventListener('visibilitychange', onVis)
      canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault()
        setStatus('failed')
      })
      engine.play()
      engine.setState(storyAt(progress))
      setStatus('ready')
      startLog()
      bindPointer()
      st?.update()
    })
    .catch((err) => {
      console.warn('[salve-regina] drawing failed to load', err)
      setStatus('failed')
    })
}

/* ---------------------------------------------- pointer: the lens only */
function bindPointer() {
  const local = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const isUi = (e: PointerEvent) => !!(e.target as HTMLElement).closest('button, a')
  let holding = false
  stage.addEventListener('pointermove', (e) => {
    const p = local(e)
    const active = e.pointerType === 'mouse' ? !isUi(e) : holding
    engine?.setPointer(p.x, p.y, active)
  })
  stage.addEventListener('pointerdown', (e) => {
    if (isUi(e) || e.pointerType === 'mouse') return
    holding = true
    const p = local(e)
    engine?.setPointer(p.x, p.y, true)
  })
  const end = (e: PointerEvent) => {
    holding = false
    const p = local(e)
    engine?.setPointer(p.x, p.y, false)
  }
  window.addEventListener('pointerup', (e) => { if (holding) end(e) })
  stage.addEventListener('pointercancel', end)
  stage.addEventListener('pointerleave', end)
}

/* ------------------- running log: the current passage, typed out verse by verse */
let logTimer = 0
function startLog() {
  clearInterval(logTimer)
  const feed = passageFeed(passage)
  let next = 0
  const lines: string[] = []
  logTimer = window.setInterval(() => {
    lines.push(feed[next++ % feed.length])
    if (lines.length > 14) lines.shift()
    logEl.textContent = lines.join('\n')
  }, reduced ? 2400 : 520)
}

/* ------------------------------------------------------ passage dock */
dock.querySelectorAll<HTMLButtonElement>('button[data-passage]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.passage as PassageId
    if (id === passage) return
    passage = id
    dock.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-checked', String(b === btn))
      b.classList.toggle('is-active', b === btn)
    })
    statusEl.textContent = btn.dataset.label ?? ''
    engine?.setPassage(id)
    startLog()
  })
})

/* ------------------------------------------------------ smooth scroll */
function startLenis() {
  if (reduced) return
  lenis = new Lenis({ lerp: 0.085 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

/* ------------------------------------------------ intro + scroll story */
function startStory() {
  if (!reduced) {
    gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.3 })
      .from('.tx-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
      .from('.tx-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.2)
      .from('.tx-aside__in, .tx-dock, .tx-hint__in', { opacity: 0, duration: 1.2, stagger: 0.08 }, 0.7)
  }

  const story = { p: 0 }
  const apply = (p: number) => {
    progress = p
    engine?.setState(storyAt(p))
  }
  // 0 → .9: the drawing, the face, the veil, then decode. .9 → 1: "Salve Regina." holds before the page continues.
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
  tl.to(story, { p: 1, duration: 1, onUpdate: () => apply(story.p) }, 0)
    .to('.tx-hint', { opacity: 0, duration: 0.05 }, 0)
    .to('.tx-head, .tx-aside', { opacity: 0, y: -24, duration: 0.1, stagger: 0.02 }, 0.12)
    .to('.tx-log, .tx-dock, .tx-top__r', { opacity: 0, duration: 0.08 }, 0.78)
    .fromTo('.tx-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.86)

  st = ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    animation: reduced ? undefined : tl,
    scrub: reduced ? false : 0.7,
    onUpdate(self) {
      if (!reduced) return
      // discrete states only: whole figure → reading the face → decoded
      const p = self.progress > 0.8 ? 1 : self.progress > 0.35 ? 0.5 : 0
      tl.progress(p)
      apply(p)
    },
  })
  apply(0)
}

const scrollToY = (y: number) => {
  if (lenis) lenis.scrollTo(y, { duration: 2 })
  else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
}
$('[data-tx-replay]')?.addEventListener('click', () => st && scrollToY(st.start))
$('[data-tx-next]')?.addEventListener('click', (e) => {
  const target = $<HTMLElement>('#lanjut')
  if (!target) return
  e.preventDefault()
  scrollToY(target.getBoundingClientRect().top + window.scrollY)
})

/* ------------------------------------- the section after: cards rise in as they arrive */
root.classList.add('rise-on')
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('is-in'), io.unobserve(e.target))),
  { rootMargin: '0px 0px -10% 0px' },
)
document.querySelectorAll('[data-rise]').forEach((el) => io.observe(el))

reducedMq.addEventListener('change', () => {
  reduced = reducedMq.matches
  engine?.setStatic(reduced)
})

/* ------------------------------------------------------------ go */
const gl = (() => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
})()

if (gl) {
  root.classList.add('tx-live')
  setStatus('loading')
  startLenis()
  startStory()
  startEngine()
} else {
  setStatus('failed')
}
