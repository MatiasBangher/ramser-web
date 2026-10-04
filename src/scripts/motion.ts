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

type WorksStrip = {
  section: HTMLElement;
  pin: HTMLElement;
  viewport: HTMLElement;
  track: HTMLElement;
  frames: HTMLElement[];
  counter: HTMLElement | null;
};

function worksStrip(): WorksStrip | null {
  const section = document.querySelector<HTMLElement>('[data-works]');
  const pin = section?.querySelector<HTMLElement>('[data-works-pin]');
  const viewport = section?.querySelector<HTMLElement>('[data-works-viewport]');
  const track = section?.querySelector<HTMLElement>('[data-works-track]');
  if (!section || !pin || !viewport || !track) return null;
  return {
    section,
    pin,
    viewport,
    track,
    frames: gsap.utils.toArray<HTMLElement>('[data-works-frame]', track),
    counter: section.querySelector<HTMLElement>('[data-works-counter]'),
  };
}

/** Index of the frame whose left edge has passed the middle of the visible strip. */
function setWorksCounter(strip: WorksStrip, offset: number) {
  if (!strip.counter) return;
  // Map travel progress to a frame index so the last frame is reached at the end
  // even when several frames fit in the viewport at once.
  const max = Math.max(1, strip.track.scrollWidth - strip.viewport.clientWidth);
  const progress = Math.min(1, Math.max(0, offset / max));
  const current = Math.round(progress * (strip.frames.length - 1));
  strip.counter.textContent = String(current + 1).padStart(2, '0');
}

/** Native strip counter (mobile, reduced motion). State, not motion: runs in every mode. */
function worksCounter(strip: WorksStrip) {
  strip.viewport.addEventListener('scroll', () => setWorksCounter(strip, strip.viewport.scrollLeft), { passive: true });
}

/**
 * Desktop film strip: pin the sequence and translate it horizontally with the
 * vertical scroll. Each photo drifts slightly inside its frame.
 */
function worksCinematic(strip: WorksStrip) {
  const { pin, viewport, track, frames } = strip;
  const overflow = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  pin.classList.add('is-cinematic');
  viewport.scrollLeft = 0;
  // Arrow keys cannot scroll an overflow:hidden strip; frames stay reachable via Tab.
  viewport.removeAttribute('tabindex');

  const tween = gsap.to(track, {
    x: () => -overflow(),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      pin: true,
      start: 'top top',
      end: () => `+=${overflow()}`,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: () => setWorksCounter(strip, -Number(gsap.getProperty(track, 'x'))),
    },
  });

  frames.forEach((frame) => {
    const img = frame.querySelector<HTMLElement>('[data-works-img]');
    if (!img) return;
    // ±5% of a 112%-wide layer stays inside the 6% bleed on each side.
    gsap.fromTo(
      img,
      { xPercent: 5 },
      {
        xPercent: -5,
        ease: 'none',
        scrollTrigger: { trigger: frame, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      },
    );
  });

  // Keyboard: focusing an off-screen frame scrolls the page to where that frame is in view.
  const onFocus = (e: FocusEvent) => {
    const frame = (e.target as HTMLElement).closest<HTMLElement>('[data-works-frame]');
    const st = tween.scrollTrigger;
    viewport.scrollLeft = 0;
    if (!frame || !st) return;
    const pad = frames[0]?.offsetLeft ?? 0;
    const max = overflow() || 1;
    const progress = gsap.utils.clamp(0, 1, (frame.offsetLeft - pad) / max);
    window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'auto' });
  };
  viewport.addEventListener('focusin', onFocus);

  // Lazy images do not change layout (frames are sized by CSS), but refresh once they decode anyway.
  const refresh = () => ScrollTrigger.refresh();
  const pending = Array.from(track.querySelectorAll('img')).filter((img) => !img.complete);
  pending.forEach((img) => img.addEventListener('load', refresh, { once: true }));

  return () => {
    viewport.removeEventListener('focusin', onFocus);
    pending.forEach((img) => img.removeEventListener('load', refresh));
    pin.classList.remove('is-cinematic');
    viewport.setAttribute('tabindex', '0');
    gsap.set(track, { clearProps: 'transform' });
  };
}

headerState();
const strip = worksStrip();
if (strip) worksCounter(strip);

const mm = gsap.matchMedia();
if (strip) {
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => worksCinematic(strip));
}
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
