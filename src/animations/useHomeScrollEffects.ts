import { useEffect, type RefObject } from 'react'
import {
  gsap,
  ScrollTrigger,
  isDesktopMotion,
  killAllScrollTriggers,
  prefersReducedMotion,
  refreshScrollTriggers,
} from './gsap'

function countUp(
  el: HTMLElement,
  target: number,
  suffix = '',
  duration = 1.4,
) {
  const proxy = { value: 0 }
  gsap.to(proxy, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${Math.round(proxy.value)}${suffix}`
    },
  })
}

export function useHomeScrollEffects(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = prefersReducedMotion()
    const desktop = isDesktopMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        root.querySelectorAll<HTMLElement>('[data-count]').forEach((stat) => {
          const target = stat.dataset.count || '0'
          const suffix = stat.dataset.suffix || ''
          stat.textContent = `${target}${suffix}`
        })
        root.querySelectorAll('.data-readout-label').forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0 })
        })
        return
      }

      // Sticky image pin removed: it left leftover overlays that blocked page changes.

      // 2. Feature list active states (no pin — pinning blocked page navigation)
      if (desktop) {
        const items = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll('.feature-item'),
        )

        items.forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => item.classList.toggle('is-active', self.isActive),
          })
        })
      }

      // 3. Animated data readout
      const readout = root.querySelector('.data-readout-section')
      if (readout) {
        const paths = readout.querySelectorAll<SVGPathElement>('.icon-path')
        const stats = readout.querySelectorAll<HTMLElement>('[data-count]')

        if (paths.length) {
          paths.forEach((path) => {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })
          })

          ScrollTrigger.create({
            trigger: readout,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              paths.forEach((path) => {
                gsap.to(path, {
                  strokeDashoffset: 0,
                  duration: 1.5,
                  ease: 'power2.out',
                })
              })
              stats.forEach((stat) => {
                const target = Number(stat.dataset.count || 0)
                const suffix = stat.dataset.suffix || ''
                countUp(stat, target, suffix)
              })
              gsap.fromTo(
                readout.querySelectorAll('.data-readout-label'),
                { opacity: 0, y: 12 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: 'power2.out',
                  delay: 0.35,
                },
              )
            },
          })
        }
      }

      // 4. Horizontal scroll gallery
      if (desktop) {
        const galleryWrapper = root.querySelector('.gallery-wrapper')
        const galleryTrack = root.querySelector<HTMLElement>('.gallery-track')
        const cards = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll('.gallery-card'),
        )

        if (galleryWrapper && galleryTrack && cards.length) {
          const scrollAmount = () =>
            Math.max(galleryTrack.scrollWidth - window.innerWidth, 0)

          const tween = gsap.to(galleryTrack, {
            x: () => -scrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: galleryWrapper,
              start: 'top top',
              end: () => `+=${scrollAmount()}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })

          cards.forEach((card) => {
            ScrollTrigger.create({
              trigger: card,
              containerAnimation: tween,
              start: 'left 55%',
              end: 'right 45%',
              onToggle: (self) =>
                card.classList.toggle('is-focused', self.isActive),
            })
          })
        }
      }

      // 5. General scroll reveals
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.gsap-reveal')).forEach(
        (el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        },
      )

      gsap.utils
        .toArray<HTMLElement>(root.querySelectorAll('.gsap-reveal-stagger'))
        .forEach((group) => {
          const children = group.children
          if (!children.length) return
          gsap.fromTo(
            children,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        })
    }, root)

    const onLoad = () => refreshScrollTriggers()
    const onResize = () => refreshScrollTriggers()
    window.addEventListener('load', onLoad)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', onResize)
      ctx.revert()
      killAllScrollTriggers()
    }
  }, [rootRef])
}
