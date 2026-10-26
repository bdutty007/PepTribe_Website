// PepTribe PepCard image URL helper.
//
// Thin wrapper over the centralized pepCards.ts canonical map so the
// PepCard viewer can resolve any Atlas compound name / alias / slug to
// the exact audited front-page PepCard image URL without duplicating the
// 66-record mapping.

import { getPepCardMeta } from "@/data/pepCards";

/**
 * Resolve any Atlas compound name / alias / slug to the exact audited
 * front-page PepCard image URL (FileSafe CDN). Returns null when no
 * canonical card exists (e.g. IGF-1 LR3, which is intentionally excluded).
 */
export function getPepCardImageUrl(name: string): string | null {
  return getPepCardMeta(name)?.page1Url ?? null;
}
