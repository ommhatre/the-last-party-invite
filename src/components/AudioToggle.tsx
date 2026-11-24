import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audio as audioAssets } from '../data/assets';

/** Ambient music toggle. Off by default; audio is only created after the visitor taps it. */
export function AudioToggle() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => () => audio.current?.pause(), []);

  if (unavailable) return null;

  const toggle = async () => {
    if (!audio.current) {
      const el = new Audio(audioAssets.ambient);
      el.loop = true;
      el.volume = 0.35;
      el.addEventListener('error', () => {
        setPlaying(false);
        setUnavailable(true);
      });
      audio.current = el;
    }
    if (playing) {
      audio.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      className="icon-ctrl"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Mute court music' : 'Play court music'}
      title={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
    </button>
  );
}
