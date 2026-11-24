import { Fragment } from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  target: string | null;
  placeholder: string;
  elapsedText: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function Countdown({ target, placeholder, elapsedText }: CountdownProps) {
  const { status, days, hours, minutes, seconds } = useCountdown(target);

  if (status !== 'running') {
    return (
      <div className="countdown countdown--message">
        <span className="countdown__hourglass" aria-hidden="true" />
        <p>{status === 'unset' ? placeholder : elapsedText}</p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ];

  return (
    <div className="countdown" role="timer" aria-live="off" aria-label={`${days} days, ${hours} hours, ${minutes} minutes remaining`}>
      {units.map((u, i) => (
        <Fragment key={u.label}>
          {i > 0 && (
            <span className="countdown__sep" aria-hidden="true">
              &#9670;
            </span>
          )}
          <div className="countdown__unit">
            <span className="countdown__value">{u.value}</span>
            <span className="countdown__label">{u.label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
