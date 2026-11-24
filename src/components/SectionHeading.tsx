import { decor } from '../data/assets';
import { OrnamentRule } from './Ornament';
import { SafeImage } from './SafeImage';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, id }: SectionHeadingProps) {
  return (
    <header className="heading" data-reveal="heading">
      {eyebrow && <span className="heading__eyebrow" data-reveal-item>{eyebrow}</span>}
      <h2 className="heading__title" id={id} data-reveal-item>
        {title}
      </h2>
      <div data-reveal-item>
        <SafeImage src={decor.dividerOrnate} className="heading__divider" fallback={<OrnamentRule />} />
      </div>
      {subtitle && (
        <p className="heading__subtitle" data-reveal-item>
          {subtitle}
        </p>
      )}
    </header>
  );
}
