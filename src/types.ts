export type BannerFormat = 'horizontal' | 'square';
export type BannerLayout = 'split' | 'overlay' | 'artwork';
export type BannerStorage = 'session' | 'local';

export type BannerMedia = {
  src: string;
  avifSrc?: string;
  mobileSrc?: string;
  mobileAvifSrc?: string;
  alt: string;
  fit?: 'cover' | 'contain';
  position?: string;
  flipX?: boolean;
  width?: number;
  height?: number;
};

export type BannerTheme = {
  background?: string;
  foreground?: string;
  accent?: string;
  surface?: string;
};

type BannerBase = {
  id: string;
  eyebrow?: string;
  badge?: string;
  accentTitle?: string;
  description?: string;
  footnote?: string;
  ctaLabel: string;
  href: string;
  target?: '_self' | '_blank';
  media: BannerMedia;
  theme?: BannerTheme;
  dismissible?: boolean;
  dismissStorage?: BannerStorage;
};

export type BannerConfig =
  | (BannerBase & { format: 'horizontal'; layout?: 'split' | 'overlay'; title: string })
  | (BannerBase & { format: 'square'; layout: 'overlay'; title: string })
  | (BannerBase & { format: BannerFormat; layout: 'artwork'; title?: string });

export type PromotionMedia = {
  src: string;
  avifSrc?: string;
  mobileSrc?: string;
  mobileAvifSrc?: string;
  poster?: string;
  type?: 'image' | 'video';
  alt: string;
  width?: number;
  height?: number;
};

export type PromotionConfig = {
  id: string;
  media: PromotionMedia;
  href: string;
  ctaLabel: string;
  target?: '_self' | '_blank';
};
