export function initializeMotion() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)')
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        if (!preference.matches) entry.target.classList.add('story-entered')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.12 },
  )
  document
    .querySelectorAll('.section-head, .symbol-copy, .age-visual, .closing-grid')
    .forEach((el) => observer.observe(el))
  for (const el of document.querySelectorAll('.count-up')) {
    const output = el.querySelector('[aria-hidden]'),
      text = output.textContent
    const value = parseFloat(text),
      format = (n) =>
        n.toLocaleString('en-MY', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + '%'
    let frame = 0
    preference.addEventListener('change', () => {
      cancelAnimationFrame(frame)
      output.textContent = text
    })
    const countObserver = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      countObserver.disconnect()
      if (preference.matches) return
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 850, 1)
        output.textContent = format(value * (1 - Math.pow(1 - progress, 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    countObserver.observe(el)
  }
  const nav = document.querySelector('.progress-nav'),
    overview = document.querySelector('.chapter-overview'),
    toggle = document.querySelector('.overview-toggle')
  const setOpen = (open) => {
    overview.hidden = !open
    overview.classList.toggle('open', open)
    toggle.setAttribute('aria-expanded', String(open))
  }
  toggle.addEventListener('click', () => setOpen(overview.hidden))
  overview
    .querySelectorAll('button,a')
    .forEach((el) => el.addEventListener('click', () => setOpen(false)))
  const chapters = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const active = Number(entry.target.id.slice(-1)) - 1
        nav.querySelector('.nav-line i').style.height = `${(active / 5) * 100}%`
        nav
          .querySelectorAll('a[href^="#act-"]')
          .forEach((el, i) => el.classList.toggle('active', active === i))
      }
    },
    { rootMargin: '-35% 0px -55%' },
  )
  document.querySelectorAll('section.act').forEach((el) => chapters.observe(el))
}
