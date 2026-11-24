import type { CSSProperties } from 'react';
import type { FrameKey } from '../data/assets';

/** Where the maroon opening sits inside each frame image (percent insets: top right bottom left) and its shape. */
export const FRAME_GEOMETRY: Record<FrameKey, { ratio: string; inset: string; radius: string }> = {
  oval1: { ratio: '160 / 212', inset: '18% 19% 16% 19%', radius: '50%' },
  oval2: { ratio: '157 / 200', inset: '19% 21% 15% 20%', radius: '50%' },
  ovalLarge: { ratio: '185 / 268', inset: '18% 20% 17% 20%', radius: '50%' },
  arch: { ratio: '152 / 202', inset: '15% 20% 13% 20%', radius: '50% 50% 4% 4% / 32% 32% 4% 4%' },
  rect1: { ratio: '138 / 206', inset: '14.5% 18% 13.5% 18%', radius: '2px' },
  rect2: { ratio: '146 / 202', inset: '15% 17% 15% 17%', radius: '2px' },
  rectSmall: { ratio: '143 / 184', inset: '15% 18% 15% 18%', radius: '2px' },
  squareOrnate: { ratio: '230 / 255', inset: '20% 19% 18% 19%', radius: '2px' },
};

export const frameVars = (key: FrameKey): CSSProperties =>
  ({
    '--frame-ratio': FRAME_GEOMETRY[key].ratio,
    '--opening-inset': FRAME_GEOMETRY[key].inset,
    '--opening-radius': FRAME_GEOMETRY[key].radius,
  }) as CSSProperties;
