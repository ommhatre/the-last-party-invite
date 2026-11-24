import { gsap } from './gsap';

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Shared scroll choreography for a section:
 * - parallax on `.bg-layer`
 * - staggered heading reveal on `[data-reveal="heading"] [data-reveal-item]`
 * - single fade-ups on `[data-reveal="fade"]`
 * - staggered groups on `[data-reveal="group"]` > `[data-reveal-child]`
 *
 * End values are explicit (fromTo) so a ScrollTrigger refresh can never record a
 * half-finished state as the destination.
 */
export function revealSection(section: HTMLElement) {
  const bg = section.querySelector('.bg-layer');
  if (bg) {
    gsap.fromTo(
      bg,
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
    gsap.fromTo(
      bg,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.8,
        ease: 'power1.out',
        scrollTrigger: { trigger: section, start: 'top 85%' },
      },
    );
  }

  section.querySelectorAll<HTMLElement>('[data-reveal="heading"]').forEach((heading) => {
    gsap.fromTo(
      heading.querySelectorAll('[data-reveal-item]'),
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      },
    );
  });

  section.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    );
  });

  section.querySelectorAll<HTMLElement>('[data-reveal="group"]').forEach((group) => {
    gsap.fromTo(
      group.querySelectorAll('[data-reveal-child]'),
      { opacity: 0, y: 40, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 82%' },
      },
    );
  });
}
