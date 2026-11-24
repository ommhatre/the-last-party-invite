import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ScrollTrigger, prefersReducedMotion } from './lib/gsap';
import { IntroContext } from './lib/intro';
import { siteConfig } from './data/siteConfig';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { DoorEntrance } from './components/DoorEntrance';
import { ScrollProgress } from './components/ScrollProgress';
import { AudioToggle } from './components/AudioToggle';
import { CourtSection } from './sections/CourtSection';
import { BanquetSection } from './sections/BanquetSection';
import { ProclamationSection } from './sections/ProclamationSection';
import { FinalSection } from './sections/FinalSection';

const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion() ? 'instant' : 'smooth');

/** Resolves once the window has (nearly) reached the top, or after a timeout. */
function waitForTop(timeout = 2500) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const tick = () => {
      if (window.scrollY < 2 || performance.now() - start > timeout) resolve();
      else requestAnimationFrame(tick);
    };
    tick();
  });
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [entered, setEntered] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  useBodyScrollLock(!opened);

  // While the doors are closed the page is locked, so it must sit at the top. Browsers restore
  // the old scroll position on refresh after first paint (and again on load / bfcache restore).
  useLayoutEffect(() => {
    if (opened) return;
    const toTop = () => window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory('manual');
    toTop();
    window.addEventListener('load', toTop);
    window.addEventListener('pageshow', toTop);
    return () => {
      window.removeEventListener('load', toTop);
      window.removeEventListener('pageshow', toTop);
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [opened]);

  const handleOpened = useCallback(() => {
    setOpened(true);
    setEntered(true);
  }, []);

  const handleEnter = useCallback(() => {
    document.getElementById('court')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  }, []);

  const replayIntro = useCallback(async () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    await waitForTop();
    setOpened(false);
    setIntroKey((k) => k + 1);
  }, []);

  const ctx = useMemo(() => ({ entered, replayIntro }), [entered, replayIntro]);

  return (
    <IntroContext.Provider value={ctx}>
      <main className="journey">
        <DoorEntrance key={introKey} onOpened={handleOpened} onEnter={handleEnter} />
        <CourtSection />
        <BanquetSection />
        <ProclamationSection />
        <FinalSection />
      </main>

      <ScrollProgress visible={opened} />

      {opened && (
        <div className="court-controls">
          <button
            type="button"
            className="icon-ctrl"
            onClick={replayIntro}
            aria-label="Replay the opening ceremony"
            title="Replay the opening"
          >
            <RotateCcw aria-hidden="true" />
          </button>
          {siteConfig.musicEnabled && <AudioToggle />}
        </div>
      )}

      <div className="grain" aria-hidden="true" />
    </IntroContext.Provider>
  );
}
