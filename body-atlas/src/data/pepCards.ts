// PepTribe Pep-Card canonical metadata.
//
// Authoritative source of truth:
//   DL_Agent_PepCard_Master_Manifest.csv  (66 canonical cards)
//   DL_Agent_Front_Page_URLs_Part1/2.md   (Page 1 Media Storage URLs)
//
// The completed Pep-Card library contains:
//   - 66 canonical cards total
//   - 61 complete two-page cards
//   - 5 intentional single-page cards (Dihexa, Methylene Blue, MK-677,
//     SLU-PP-332, Snap-8) — these do not use the standard second-page
//     reconstitution/mixing reference format.
//
// The Body Atlas links to individual Pep-Cards via the PUBLIC route:
//   https://peptribe.us/pep_cards?card=<canonical-slug>
// The Media Storage Page 1 URLs below are kept ONLY for internal
// verification / reconciliation and are NEVER used as a public CTA target.

export const PEP_CARDS_LANDING_URL = "https://peptribe.us/pep_cards";

export interface PepCardMeta {
  /** Canonical display name from the master manifest. */
  canonicalName: string;
  /** Canonical public card slug from the master manifest. */
  slug: string;
  /** Whether this card is a complete two-page card (true) or an
   *  intentional single-page card (false). */
  twoPage: boolean;
  /** Audited Page 1 filename from the master manifest. */
  page1Filename: string;
  /** Page 1 Media Storage URL — internal verification only,
   *  never used as a public CTA destination. */
  page1Url: string;
  /** Atlas-side aliases that resolve to this canonical card. */
  aliases: string[];
}

/**
 * The 66 canonical Pep-Cards, ordered to match the master manifest.
 */
export const PEP_CARDS: PepCardMeta[] = [
  {
    canonicalName: "5-Amino-1MQ",
    slug: "5-amino-1mq",
    twoPage: true,
    page1Filename: "5-AMINO-1MQ.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948dbc55ee8d5699735a.png",
    aliases: ["5amino1mq", "5-amino-1-mq"],
  },
  {
    canonicalName: "Abaloparatide",
    slug: "abaloparatide",
    twoPage: true,
    page1Filename: "Abaloparatide.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948d196984c4080430c0.png",
    aliases: [],
  },
  {
    canonicalName: "Adamax",
    slug: "adamax",
    twoPage: true,
    page1Filename: "Adamax.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948d2e74dc36120986ab.png",
    aliases: [],
  },
  {
    canonicalName: "Adipotide",
    slug: "adipotide",
    twoPage: true,
    page1Filename: "Adipotide.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948da19db9abccb6d940.png",
    aliases: [],
  },
  {
    canonicalName: "AOD-9604",
    slug: "aod-9604",
    twoPage: true,
    page1Filename: "AOD-9604.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948d47854373d7af11de.png",
    aliases: ["aod9604"],
  },
  {
    canonicalName: "ARA-290",
    slug: "ara-290",
    twoPage: true,
    page1Filename: "ARA-290.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948d47854373d7af11df.png",
    aliases: ["ara290"],
  },
  {
    canonicalName: "BPC-157",
    slug: "bpc-157",
    twoPage: true,
    page1Filename: "BPC-157.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948fcb032a1c8e037c43.png",
    aliases: ["bpc157"],
  },
  {
    canonicalName: "Bronchogen",
    slug: "bronchogen",
    twoPage: true,
    page1Filename: "Bronchogen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948f47854373d7af1248.png",
    aliases: [],
  },
  {
    canonicalName: "Cardiogen",
    slug: "cardiogen",
    twoPage: true,
    page1Filename: "Cardiogen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948fbc55ee8d56997390.png",
    aliases: [],
  },
  {
    canonicalName: "Cartalax",
    slug: "cartalax",
    twoPage: true,
    page1Filename: "Cartalax.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948fcb032a1c8e037c4f.png",
    aliases: [],
  },
  {
    canonicalName: "Chonluten",
    slug: "chonluten",
    twoPage: true,
    page1Filename: "Chonluten.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948f196984c408043118.png",
    aliases: [],
  },
  {
    canonicalName: "CJC-1295 NO DAC",
    slug: "cjc-1295-no-dac",
    twoPage: true,
    page1Filename: "CJC-1295 (NO DAC).png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99490196984c408043144.png",
    aliases: ["cjc1295nodac", "cjc-1295nodac", "cjc1295 no dac"],
  },
  {
    canonicalName: "CJC-1295 with DAC",
    slug: "cjc-1295-with-dac",
    twoPage: true,
    page1Filename: "CJC-1295 (with DAC).png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99490bc55ee8d569973ce.png",
    aliases: ["cjc1295withdac", "cjc-1295withdac", "cjc1295 dac", "cjc1295dac"],
  },
  {
    canonicalName: "CJC_IPA Blend",
    slug: "cjc-ipa-blend",
    twoPage: true,
    page1Filename: "CJC-1295 & Ipamorelin.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948fa19db9abccb6d976.png",
    aliases: [
      "cjcipa",
      "cjc/ipa",
      "cjc ipa",
      "cjc-1295 & ipamorelin",
      "cjc1295andipamorelin",
      "cjc-1295/ipamorelin",
      "cjc1295/ipamorelin",
      "cjc and ipa",
    ],
  },
  {
    canonicalName: "Cortagen",
    slug: "cortagen",
    twoPage: true,
    page1Filename: "Cortagen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99491196984c408043158.png",
    aliases: [],
  },
  {
    canonicalName: "Crystagen",
    slug: "crystagen",
    twoPage: true,
    page1Filename: "Crystagen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99491cb032a1c8e037c77.png",
    aliases: [],
  },
  {
    canonicalName: "Dihexa",
    slug: "dihexa",
    twoPage: false,
    page1Filename: "DIHEXA.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99491196984c408043164.png",
    aliases: [],
  },
  {
    canonicalName: "DSIP",
    slug: "dsip",
    twoPage: true,
    page1Filename: "DSIP.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99491c73b042e141264e1.png",
    aliases: [],
  },
  {
    canonicalName: "Epitalon",
    slug: "epitalon",
    twoPage: true,
    page1Filename: "Epitalon.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99491bc55ee8d569973f6.png",
    aliases: ["epithalon"],
  },
  {
    canonicalName: "FOX04-DRI",
    slug: "fox04-dri",
    twoPage: true,
    page1Filename: "FOX04-DRI.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99492bc55ee8d5699741e.png",
    aliases: ["foxo4-dri", "foxo4dri", "fox04dri"],
  },
  {
    canonicalName: "GHK-Cu",
    slug: "ghk-cu",
    twoPage: true,
    page1Filename: "GHK-Cu.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99492cb032a1c8e037c9f.png",
    aliases: ["ghkcu", "copper tripeptide"],
  },
  {
    canonicalName: "GHRP-2",
    slug: "ghrp-2",
    twoPage: true,
    page1Filename: "GHRP-2.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949298106dcc4e1f1138.png",
    aliases: ["ghrp2"],
  },
  {
    canonicalName: "GLOW",
    slug: "glow",
    twoPage: true,
    page1Filename: "GLOW.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99492cb032a1c8e037cab.png",
    aliases: [],
  },
  {
    canonicalName: "Glutathione",
    slug: "glutathione",
    twoPage: true,
    page1Filename: "Glutathione.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949298106dcc4e1f1143.png",
    aliases: [],
  },
  {
    canonicalName: "hCG",
    slug: "hcg",
    twoPage: true,
    page1Filename: "HCG.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949290b7ca67e9c21899.png",
    aliases: ["hcg"],
  },
  {
    canonicalName: "HGH",
    slug: "hgh",
    twoPage: true,
    page1Filename: "HGH.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949290b7ca67e9c218b6.png",
    aliases: ["human growth hormone", "somatropin"],
  },
  {
    canonicalName: "HMG",
    slug: "hmg",
    twoPage: true,
    page1Filename: "HMG.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949390b7ca67e9c218dd.png",
    aliases: [],
  },
  {
    canonicalName: "Ipamorelin",
    slug: "ipamorelin",
    twoPage: true,
    page1Filename: "Ipamorelin.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa994949f8b31b6ab2c338e.png",
    aliases: ["ipa"],
  },
  {
    canonicalName: "Kisspeptin-10",
    slug: "kisspeptin-10",
    twoPage: true,
    page1Filename: "Kisspeptin-10.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99494a19db9abccb6da22.png",
    aliases: ["kisspeptin10", "kisspeptin"],
  },
  {
    canonicalName: "KLOW",
    slug: "klow",
    twoPage: true,
    page1Filename: "KLOW.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949490b7ca67e9c218e9.png",
    aliases: [],
  },
  {
    canonicalName: "KPV",
    slug: "kpv",
    twoPage: true,
    page1Filename: "KPV.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99494c73b042e14126593.png",
    aliases: [],
  },
  {
    canonicalName: "Livagen",
    slug: "livagen",
    twoPage: true,
    page1Filename: "Livagen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949447854373d7af131e.png",
    aliases: [],
  },
  {
    canonicalName: "LL-37",
    slug: "ll-37",
    twoPage: true,
    page1Filename: "LL-37.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99495cb032a1c8e037d17.png",
    aliases: ["ll37"],
  },
  {
    canonicalName: "Melanotan I",
    slug: "melanotan-i",
    twoPage: true,
    page1Filename: "Melanotan I.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949547854373d7af136e.png",
    aliases: ["melanotan1", "melanotan 1", "melanotani"],
  },
  {
    canonicalName: "Melanotan II",
    slug: "melanotan-ii",
    twoPage: true,
    page1Filename: "Melanotan II.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949598106dcc4e1f1190.png",
    aliases: ["melanotan2", "melanotan 2", "melanotanii", "mt2"],
  },
  {
    canonicalName: "Methylene Blue",
    slug: "methylene-blue",
    twoPage: false,
    page1Filename: "Methylene Blue.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa994952e74dc3612098773.png",
    aliases: ["methyleneblue", "mb"],
  },
  {
    canonicalName: "MK-677",
    slug: "mk-677",
    twoPage: false,
    page1Filename: "MK-677.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99495c73b042e141265cb.png",
    aliases: ["mk677", "ibutamoren"],
  },
  {
    canonicalName: "MOTS-c",
    slug: "mots-c",
    twoPage: true,
    page1Filename: "MOTS-c.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99495a19db9abccb6da5e.png",
    aliases: ["motsc", "mots c"],
  },
  {
    canonicalName: "NAD+",
    slug: "nad-plus",
    twoPage: true,
    page1Filename: "NAD+.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa994962e74dc361209879b.png",
    aliases: ["nad", "nad+", "nicotinamide adenine dinucleotide"],
  },
  {
    canonicalName: "Ovagen",
    slug: "ovagen",
    twoPage: true,
    page1Filename: "Ovagen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99496c73b042e14126603.png",
    aliases: [],
  },
  {
    canonicalName: "Oxytocin",
    slug: "oxytocin",
    twoPage: true,
    page1Filename: "Oxytocin.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949690b7ca67e9c21995.png",
    aliases: [],
  },
  {
    canonicalName: "P21",
    slug: "p21",
    twoPage: true,
    page1Filename: "P21.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99497a19db9abccb6da8e.png",
    aliases: [],
  },
  {
    canonicalName: "Pancragen",
    slug: "pancragen",
    twoPage: true,
    page1Filename: "Pancragen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa994972e74dc36120987db.png",
    aliases: [],
  },
  {
    canonicalName: "PE-22-28",
    slug: "pe-22-28",
    twoPage: true,
    page1Filename: "PE-22-28.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949747854373d7af13ae.png",
    aliases: ["pe2228", "pe 22 28"],
  },
  {
    canonicalName: "Pinealon",
    slug: "pinealon",
    twoPage: true,
    page1Filename: "Pinealon.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa994972e74dc36120987e7.png",
    aliases: [],
  },
  {
    canonicalName: "PNC-27",
    slug: "pnc-27",
    twoPage: true,
    page1Filename: "PNC-27.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99497196984c408043270.png",
    aliases: ["pnc27", "pnc 27"],
  },
  {
    canonicalName: "Prostamax",
    slug: "prostamax",
    twoPage: true,
    page1Filename: "Prostamax.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949847854373d7af13d6.png",
    aliases: [],
  },
  {
    canonicalName: "PT-141",
    slug: "pt-141",
    twoPage: true,
    page1Filename: "PT-141.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949847854373d7af13e6.png",
    aliases: ["pt141", "bremelanotide"],
  },
  {
    canonicalName: "Retatrutide",
    slug: "retatrutide",
    twoPage: true,
    page1Filename: "Retatrutide.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949847854373d7af13fa.png",
    aliases: [],
  },
  {
    canonicalName: "Selank",
    slug: "selank",
    twoPage: true,
    page1Filename: "Selank.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99498cb032a1c8e037dbb.png",
    aliases: [],
  },
  {
    canonicalName: "Selank Amidate",
    slug: "selank-amidate",
    twoPage: true,
    page1Filename: "Selank Amidate.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99498196984c4080432b0.png",
    aliases: ["selankamidate", "n-acetyl selank amidate"],
  },
  {
    canonicalName: "Semax",
    slug: "semax",
    twoPage: true,
    page1Filename: "Semax.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa994989f8b31b6ab2c340a.png",
    aliases: [],
  },
  {
    canonicalName: "Sermorelin",
    slug: "sermorelin",
    twoPage: true,
    page1Filename: "Sermorelin.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99499196984c4080432d8.png",
    aliases: [],
  },
  {
    canonicalName: "SLU-PP-332",
    slug: "slu-pp-332",
    twoPage: false,
    page1Filename: "SLU-PP-332.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949a90b7ca67e9c21a14.png",
    aliases: ["slupp332", "slu pp 332"],
  },
  {
    canonicalName: "Snap-8",
    slug: "snap-8",
    twoPage: false,
    page1Filename: "Snap-8.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949947854373d7af1422.png",
    aliases: ["snap8", "snap 8", "acetyl octapeptide-3"],
  },
  {
    canonicalName: "SS-31",
    slug: "ss-31",
    twoPage: true,
    page1Filename: "SS-31.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99499bc55ee8d5699752b.png",
    aliases: ["ss31", "elamipretide"],
  },
  {
    canonicalName: "TB-500",
    slug: "tb-500",
    twoPage: true,
    page1Filename: "TB-500.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949a90b7ca67e9c21a15.png",
    aliases: ["tb500", "thymosin beta-4"],
  },
  {
    canonicalName: "Tesa-IPA-CJC",
    slug: "tesa-ipa-cjc",
    twoPage: true,
    page1Filename: "Tesa-IPA-CJC.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99499196984c4080432fc.png",
    aliases: [
      "tesa/ipa/cjc",
      "tesa ipa cjc",
      "tesaipacjc",
      "tesa/ipamorelin/cjc",
    ],
  },
  {
    canonicalName: "Tesamorelin",
    slug: "tesamorelin",
    twoPage: true,
    page1Filename: "Tesamorelin.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949ac73b042e1412668f.png",
    aliases: [],
  },
  {
    canonicalName: "Testagen",
    slug: "testagen",
    twoPage: true,
    page1Filename: "Testagen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9949abc55ee8d56997548.png",
    aliases: [],
  },
  {
    canonicalName: "Thymosin Alpha 1",
    slug: "thymosin-alpha-1",
    twoPage: true,
    page1Filename: "Thymosin Alpha-1.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948bbc55ee8d5699731a.png",
    aliases: ["thymosin alpha-1", "thymosinalpha1", "thymosin alpha1", "ta1"],
  },
  {
    canonicalName: "Tri-Heal",
    slug: "tri-heal",
    twoPage: true,
    page1Filename: "Tri-Heal.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948b2e74dc361209866f.png",
    aliases: ["triheal", "tri heal"],
  },
  {
    canonicalName: "Vesugen",
    slug: "vesugen",
    twoPage: true,
    page1Filename: "Vesugen.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948b47854373d7af118b.png",
    aliases: [],
  },
  {
    canonicalName: "Vilon",
    slug: "vilon",
    twoPage: true,
    page1Filename: "Vilon.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948b47854373d7af118a.png",
    aliases: [],
  },
  {
    canonicalName: "VIP",
    slug: "vip",
    twoPage: true,
    page1Filename: "VIP.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948b9f8b31b6ab2c325c.png",
    aliases: ["vasoactive intestinal peptide"],
  },
  {
    canonicalName: "Wolverine",
    slug: "wolverine",
    twoPage: true,
    page1Filename: "Wolverine.png",
    page1Url:
      "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa9948b9f8b31b6ab2c3267.png",
    aliases: [],
  },
];

/**
 * Normalize any name/slug into a canonical lookup key.
 * Lowercases, strips separators, and collapses common punctuation so
 * aliases like "CJC/Ipa", "CJC-1295 & Ipamorelin", and "CJC_IPA Blend"
 * all resolve to the same canonical card.
 */
export function normalizePepCardName(name: string): string {
  return (name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "");
}

// Pre-computed lookup: normalized key -> PepCardMeta.
const PEP_CARD_LOOKUP: Record<string, PepCardMeta> = (() => {
  const map: Record<string, PepCardMeta> = {};
  for (const card of PEP_CARDS) {
    map[normalizePepCardName(card.canonicalName)] = card;
    map[normalizePepCardName(card.slug)] = card;
    for (const alias of card.aliases) {
      map[normalizePepCardName(alias)] = card;
    }
  }
  return map;
})();

/**
 * Resolve any Atlas compound name, alias, or slug to its canonical
 * Pep-Card metadata. Returns null if no canonical card exists (e.g.
 * IGF-1 LR3, which is intentionally excluded from the production library).
 */
export function getPepCardMeta(name: string): PepCardMeta | null {
  return PEP_CARD_LOOKUP[normalizePepCardName(name)] ?? null;
}

/**
 * Public Pep-Card CTA URL for a compound.
 *
 * Always resolves through the canonical metadata and returns:
 *   https://peptribe.us/pep_cards?card=<canonical-slug>
 *
 * If no canonical card exists, falls back to the public Pep-Cards landing
 * page (no card query) so the CTA still goes somewhere sensible.
 */
export function getPepCardLandingHref(name: string): string {
  const meta = getPepCardMeta(name);
  if (!meta) return PEP_CARDS_LANDING_URL;
  return `${PEP_CARDS_LANDING_URL}?card=${encodeURIComponent(meta.slug)}`;
}

/**
 * Total count of canonical Pep-Cards in the audited production library.
 */
export const PEP_CARD_COUNT = PEP_CARDS.length;
