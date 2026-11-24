import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface Common {
  children: ReactNode;
  size?: 'md' | 'lg';
  className?: string;
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function GoldButton(props: AsButton | AsLink) {
  const { children, size = 'md', className = '', ...rest } = props;
  const cls = `gold-btn ${size === 'lg' ? 'gold-btn--lg' : ''} ${className}`.trim();

  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
