import { useEffect, useState } from 'react';

export interface CountdownState {
  status: 'unset' | 'running' | 'elapsed';
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const compute = (target: number | null, now: number): CountdownState => {
  if (target === null) return { status: 'unset', days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = target - now;
  if (diff <= 0) return { status: 'elapsed', days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(diff / 1000);
  return {
    status: 'running',
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
};

export function useCountdown(targetIso: string | null): CountdownState {
  const parsed = targetIso ? Date.parse(targetIso) : NaN;
  const target = Number.isNaN(parsed) ? null : parsed;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (target === null) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= target) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return compute(target, now);
}
