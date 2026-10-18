import type { BannerConfig, PromotionConfig } from './types';

const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

export function assertBannerConfig(value: BannerConfig): void {
  if (!nonempty(value.id)) throw new Error('AdBanner: id is required.');
  if (!nonempty(value.href)) throw new Error(`AdBanner ${value.id}: href is required.`);
  if (!nonempty(value.ctaLabel)) throw new Error(`AdBanner ${value.id}: ctaLabel is required.`);
  if (!nonempty(value.media?.src) || !nonempty(value.media?.alt)) throw new Error(`AdBanner ${value.id}: media.src and media.alt are required.`);
  if (!['horizontal', 'square'].includes(value.format)) throw new Error(`AdBanner ${value.id}: invalid format.`);
  const layout = value.layout ?? 'split';
  if (value.format === 'square' && layout === 'split') throw new Error(`AdBanner ${value.id}: square banners cannot use split layout.`);
  if (!['split', 'overlay', 'artwork'].includes(layout)) throw new Error(`AdBanner ${value.id}: invalid layout.`);
  if (layout !== 'artwork' && !nonempty(value.title)) throw new Error(`AdBanner ${value.id}: title is required for ${layout} layout.`);
}

export function assertPromotionConfig(value: PromotionConfig): void {
  if (!nonempty(value.id)) throw new Error('Promotion: id is required.');
  if (!nonempty(value.href)) throw new Error(`Promotion ${value.id}: href is required.`);
  if (!nonempty(value.ctaLabel)) throw new Error(`Promotion ${value.id}: ctaLabel is required.`);
  if (!nonempty(value.media?.src) || !nonempty(value.media?.alt)) throw new Error(`Promotion ${value.id}: media.src and media.alt are required.`);
}

export function assertUniqueAdIds(items: Array<{ id: string }>): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`Advertising modules: duplicate id "${item.id}".`);
    seen.add(item.id);
  }
}
