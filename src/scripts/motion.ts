import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const REVEAL_START = 'top 88%';

/** Header state (hairline darkens + compresses once scrolled). State, not motion: runs in every mode. */
function headerState() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 'top -16',
    end: 'max',
    onToggle: (self) => header.classList.toggle('is-scrolled', self.isActive),
  });
}

/**
 * Line-mask rise for every [data-split] element. Hero titles play on load,
 * the rest once when they enter the viewport. Re-splitting on resize never replays.
 */
function splitTitles() {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const inHero = !!el.closest('#inicio');
    let done = false;
    const heroIndex = inHero ? Array.from(document.querySelectorAll('#inicio [data-split]')).indexOf(el) : 0;

    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self: SplitText) {
        // Lines are now masked, so the element itself can be shown.
        gsap.set(el, { visibility: 'visible' });
        if (done) return;
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: inHero ? 1 : 0.9,
          ease: 'expo.out',
          stagger: 0.09,
          delay: inHero ? 0.45 + heroIndex * 0.25 : 0,
          scrollTrigger: inHero ? undefined : { trigger: el, start: REVEAL_START, once: true },
          onComplete: () => {
            done = true;
          },
        });
      },
    });
  });
}

/** Hero: photo wipe, parallax, then the strip cells in sequence. */
function hero() {
  const photo = document.querySelector<HTMLElement>('[data-hero-photo]');
  const parallax = document.querySelector<HTMLElement>('[data-hero-parallax]');
  const cells = gsap.utils.toArray<HTMLElement>('[data-hero-cell]');

  if (photo) {
    gsap.fromTo(
      photo,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' },
    );
  }
  if (photo && parallax) {
    gsap.to(parallax, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  if (cells.length) {
    gsap.fromTo(
      cells,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, ease: 'power1.out', stagger: 0.15, delay: 0.9 },
    );
  }
}

/** Hairlines draw from the left once. */
function rules() {
  gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } },
    );
  });
}

/** Photo wipes, alternating direction, once. */
function wipes() {
  gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
    const from = el.dataset.clip === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)';
    gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'expo.out',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
  });
}

/** Process connector draws with scroll progress. */
function processLine() {
  const line = document.querySelector<HTMLElement>('[data-process-line]');
  const section = document.querySelector<HTMLElement>('#proceso');
  if (!line || !section) return;
  gsap.fromTo(
    line,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top 65%', end: 'bottom 70%', scrub: true },
    },
  );
}

headerState();

const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  hero();
  rules();
  wipes();
  processLine();
  // Wait for webfonts so line breaks are measured with the final metrics,
  // but never hold the hero headline hostage to a slow network.
  Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 600))]).then(() => {
    splitTitles();
    ScrollTrigger.refresh();
  });
});
