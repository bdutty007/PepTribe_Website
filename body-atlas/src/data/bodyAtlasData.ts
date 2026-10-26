export interface SystemTarget {
  name: string;
  description: string;
}

export interface PeptideSignal {
  name: string;
  category: string;
  primaryFunction: string;
  keyBenefits: string[];
  mechanism: string;
  synergyPeps: string[];
  targetOrgans: string[];
  scientificRating: number;
}

export interface BodySystem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  color: string;
  accentHex: string;
  glowClass: string;
  borderClass: string;
  bgGlowClass: string;
  iconName: string;
  side: "left" | "right";
  organs: string[];
  description: string;
  peptides: PeptideSignal[];
  pinPosition: { x: number; y: number }; // percentage on 0-100 canvas
  badgeNumber: number;
  featuredPepCard: string;
  clinicalResearchCount: number;
}

export interface MascotCharacter {
  name: string;
  title: string;
  quote: string;
  description: string;
  avatarBg: string;
  badge: string;
  specialty: string;
  imageUrl?: string; // Character image URL
}

export const MASCOTS: MascotCharacter[] = [
  {
    name: "PROFESSOR PEP",
    title: "Chief Science Mascot",
    quote: "Precision signaling unlocks your cellular potential!",
    description:
      "The wise laboratory lead specializing in molecular biochemistry and evidence-based peptide signal optimization.",
    avatarBg: "from-cyan-500/20 to-blue-600/20 border-cyan-400/50",
    badge: "Lab Director",
    specialty: "Molecular Signaling & Clinical Protocols",
    imageUrl:
      "https://vibe.filesafe.space/1787757240011572474/attachments/e2183fce-8ea4-4dac-98e6-72d42e941948.png",
  },
  {
    name: "PROFESSOR PEPPER",
    title: "Master Synthesizer & Strategist",
    quote: "Stacking the right signals yields exponential vitality!",
    description:
      "Dynamic research mastermind focused on longevity protocols, mitochondrial enhancement, and systemic synergy.",
    avatarBg: "from-purple-500/20 to-pink-600/20 border-purple-400/50",
    badge: "Longevity Lead",
    specialty: "Synergistic Stacking & Cellular Repair",
    imageUrl:
      "https://vibe.filesafe.space/1787757240011572474/attachments/9e7df377-53f6-4bef-8311-8ef9ffc00ddf.png",
  },
  {
    name: "LIL PEPE",
    title: "Field Scout & Junior Researcher",
    quote: "Small peptides, HUGE transformation!",
    description:
      "Energetic guide explaining complex biological signaling pathways into fun, actionable PepCards for everyone.",
    avatarBg: "from-amber-500/20 to-orange-600/20 border-amber-400/50",
    badge: "Bio-Explorer",
    specialty: "PepCards Quick-Guides & Beginner Stacks",
    imageUrl:
      "https://vibe.filesafe.space/1787757240011572474/attachments/3b0e68f7-2a81-4585-a31a-f7646857a594.png",
  },
];

export const BODY_SYSTEMS: BodySystem[] = [
  {
    id: 1,
    slug: "brain-cognition",
    title: "BRAIN & COGNITION",
    subtitle:
      "Brain • Nervous System • Focus • Memory • Mood • Neuroprotection",
    color: "purple",
    accentHex: "#c084fc",
    glowClass: "box-glow-purple",
    borderClass: "border-purple-500/60 hover:border-purple-400",
    bgGlowClass: "from-purple-900/40 to-purple-950/80",
    iconName: "Brain",
    side: "left",
    organs: ["Brain", "Nervous System", "Central Neural Network", "Synapses"],
    description:
      "Targeted neuro-active peptide signals designed to enhance neuroplasticity, BDNF expression, synaptic clarity, executive focus, and long-term neuroprotection.",
    badgeNumber: 1,
    pinPosition: { x: 49.8, y: 4.0 },
    featuredPepCard: "Semax & Selank Cognitive Dual-Stack",
    clinicalResearchCount: 142,
    peptides: [
      {
        name: "Semax",
        category: "Nootropic & Neuroprotective",
        primaryFunction:
          "Elevates BDNF & NGF expression, sharpens mental focus, and supports stroke/trauma recovery.",
        keyBenefits: [
          "Enhances attention span & working memory",
          "Stimulates neurogenesis",
          "Protects against ischemic damage",
          "Sustains mental clarity without jitters",
        ],
        mechanism:
          "Synthetic analogue of ACTH(4-10) regulating dopamine and serotonin neurotransmitter systems.",
        synergyPeps: ["Selank", "PE-22-28", "Cerebrolysin"],
        targetOrgans: [
          "Prefrontal Cortex",
          "Hippocampus",
          "Central Nervous System",
        ],
        scientificRating: 4.9,
      },
      {
        name: "Selank",
        category: "Anxiolytic & Neuro-Modulator",
        primaryFunction:
          "Calms central nervous system hyper-arousal while maintaining high cognitive precision.",
        keyBenefits: [
          "Reduces stress & anxiety responsiveness",
          "Modulates GABA receptor activity",
          "Improves mood stability",
          "Supports immune-brain communication",
        ],
        mechanism:
          "Synthetic peptide derivative of Tuftsin that modulates enkephalins and neurotrophic factors.",
        synergyPeps: ["Semax", "N-Acetyl Semax Amidate"],
        targetOrgans: ["Limbic System", "Amygdala", "Nervous System"],
        scientificRating: 4.8,
      },
      {
        name: "PE-22-28",
        category: "Neuro-Mood Signal",
        primaryFunction:
          "Selective TREK-1 potassium channel inhibitor with potent rapid-onset mood elevating effects.",
        keyBenefits: [
          "Rapid support for resilience",
          "Promotes neuroplasticity in hippocampus",
          "Complements cognitive stress protocols",
        ],
        mechanism:
          "Targets TREK-1 channels to alter neuronal membrane potential and enhance hippocampal synaptic transmission.",
        synergyPeps: ["Semax", "Pinealon"],
        targetOrgans: ["Hippocampus", "Brainstem"],
        scientificRating: 4.6,
      },
      {
        name: "Pinealon",
        category: "Bioregulator Peptide",
        primaryFunction:
          "Short-chain peptide bioregulator that slows brain cell aging and enhances protein synthesis in neural tissue.",
        keyBenefits: [
          "Normalizes brain cell functional activity",
          "Reduces cognitive fatigue",
          "Improves memory retrieval",
        ],
        mechanism:
          "Epigenetic gene expression regulator specifically interacting with DNA sequences in brain cortical cells.",
        synergyPeps: ["Epithalon", "Semax"],
        targetOrgans: ["Cerebral Cortex", "Neuronal Ribosomes"],
        scientificRating: 4.7,
      },
    ],
  },
  {
    id: 2,
    slug: "hormones-performance",
    title: "HORMONES & PERFORMANCE",
    subtitle:
      "Pituitary • Endocrine System • Gonads • Muscle • Bone • Recovery",
    color: "pink",
    accentHex: "#f472b6",
    glowClass: "box-glow-pink",
    borderClass: "border-pink-500/60 hover:border-pink-400",
    bgGlowClass: "from-pink-900/40 to-pink-950/80",
    iconName: "Zap",
    side: "left",
    organs: [
      "Pituitary Gland",
      "Endocrine Axis",
      "Gonads",
      "Adrenals",
      "Skeletal Muscle",
    ],
    description:
      "Endocrine-modulating signals that stimulate natural secretagogue release, optimize growth hormone pulses, support lean body mass, bone density, and hormonal equilibrium.",
    badgeNumber: 2,
    pinPosition: { x: 50.0, y: 51.5 },
    featuredPepCard: "CJC-1295 + Ipamorelin Secretagogue Stack",
    clinicalResearchCount: 198,
    peptides: [
      {
        name: "CJC-1295 (DAC / No DAC)",
        category: "GHRH Secretagogue Analogue",
        primaryFunction:
          "Stimulates pituitary secretion of Growth Hormone (GH) in natural physiological pulses.",
        keyBenefits: [
          "Promotes lean muscle protein synthesis",
          "Accelerates adipose lipolysis",
          "Enhances slow-wave deep sleep quality",
          "Supports tissue repair",
        ],
        mechanism:
          "Binds to GHRH receptors on pituitary somatotropes, triggering cAMP signal cascade.",
        synergyPeps: ["Ipamorelin", "GHRP-2", "MK-677"],
        targetOrgans: [
          "Pituitary Gland",
          "Liver (IGF-1 synthesis)",
          "Skeletal Muscle",
        ],
        scientificRating: 4.9,
      },
      {
        name: "Ipamorelin",
        category: "Selective Ghrelin Receptor Agonist",
        primaryFunction:
          "Cleanest GH secretagogue with minimal effect on cortisol, prolactin, or appetite stimulation.",
        keyBenefits: [
          "Clean GH pulse elevation",
          "Supports bone mineralization",
          "Improves skin elasticity & collagen synthesis",
          "Accelerates micro-recovery",
        ],
        mechanism:
          "Selectively activates the growth hormone secretagogue receptor (GHS-R1a).",
        synergyPeps: ["CJC-1295", "BPC-157", "Tesamorelin"],
        targetOrgans: ["Pituitary Gland", "Adipocytes", "Bones"],
        scientificRating: 4.9,
      },
      {
        name: "Tesamorelin",
        category: "GHRH Peptide Factor",
        primaryFunction:
          "FDA-studied peptide specifically targeting visceral fat reduction and lipid metabolic health.",
        keyBenefits: [
          "Reduces deep abdominal visceral fat",
          "Improves lipid panel profiles",
          "Supports anabolic tone",
        ],
        mechanism:
          "Stimulates GH release which acts on hepatocytes to increase IGF-1 production and lipolysis.",
        synergyPeps: ["Ipamorelin", "AOD-9604"],
        targetOrgans: ["Visceral Adipose Tissue", "Liver", "Endocrine System"],
        scientificRating: 4.8,
      },
      {
        name: "Kisspeptin-10",
        category: "Gonadotropin Regulator",
        primaryFunction:
          "Up-regulates LH and FSH release to support endogenous hormone balance and vitality.",
        keyBenefits: [
          "Supports endogenous testosterone signaling",
          "Promotes reproductive hormone axis health",
          "Boosts drive & mood",
        ],
        mechanism:
          "Binds to KISS1R receptors in hypothalamus to trigger GnRH release.",
        synergyPeps: ["CJC-1295", "Gonadorelin"],
        targetOrgans: ["Hypothalamus", "Pituitary", "Gonads"],
        scientificRating: 4.7,
      },
    ],
  },
  {
    id: 3,
    slug: "recovery-repair",
    title: "RECOVERY & REPAIR",
    subtitle:
      "Muscle • Joints • Tendons • Ligaments • Skin • Gut • Connective Tissue",
    color: "cyan",
    accentHex: "#38bdf8",
    glowClass: "box-glow-cyan",
    borderClass: "border-cyan-500/60 hover:border-cyan-400",
    bgGlowClass: "from-cyan-900/40 to-cyan-950/80",
    iconName: "Activity",
    side: "left",
    organs: [
      "Tendons & Ligaments",
      "Articular Cartilage",
      "Skeletal Muscle Fibers",
      "Dermal Layers",
      "Gut Mucosa",
    ],
    description:
      "Tissue regeneration powerhouse signals that dramatically accelerate musculoskeletal healing, angiogenesis, collagen synthesis, and systemic connective tissue repair.",
    badgeNumber: 3,
    pinPosition: { x: 61.0, y: 72.5 },
    featuredPepCard: "BPC-157 + TB-500 Wolverine Healing Stack",
    clinicalResearchCount: 310,
    peptides: [
      {
        name: "BPC-157 (Body Protection Compound)",
        category: "Cytoprotective Repair Peptide",
        primaryFunction:
          "Accelerates soft tissue repair, tendon-to-bone integration, and gastrointestinal mucosal healing.",
        keyBenefits: [
          "Promotes rapid angiogenesis (new blood vessels)",
          "Heals tendons, ligaments, and joints",
          "Repairs leaky gut mucosal barrier",
          "Counteracts NSAID-induced gut damage",
        ],
        mechanism:
          "Upregulates VEGFR2 expression and activates FAK-paxillin pathway for cellular migration.",
        synergyPeps: ["TB-500", "GHK-Cu", "KPV"],
        targetOrgans: [
          "Tendons",
          "Ligaments",
          "Stomach Mucosa",
          "Joint Capsule",
        ],
        scientificRating: 5.0,
      },
      {
        name: "TB-500 (Thymosin Beta-4)",
        category: "Actin-Sequestering Tissue Repair Factor",
        primaryFunction:
          "Promotes cell migration, muscle fiber regeneration, and reduces scar tissue formation.",
        keyBenefits: [
          "Dramatically reduces inflammation in injured tissues",
          "Promotes muscle regeneration",
          "Enhances flexibility in fibrous scar tissue",
          "Supports cardiovascular tissue repair",
        ],
        mechanism:
          "Sequesters G-actin to form F-actin filaments, crucial for cell motility and wound remodeling.",
        synergyPeps: ["BPC-157", "GHK-Cu"],
        targetOrgans: [
          "Skeletal Muscle",
          "Fascia",
          "Heart Wall",
          "Cornea & Skin",
        ],
        scientificRating: 4.9,
      },
      {
        name: "GHK-Cu (Copper Tripeptide-1)",
        category: "Tissue Remodeling & Collagen Peptide",
        primaryFunction:
          "Stimulates collagen & elastin expression, remodels extracellular matrix, and promotes skin/wound renewal.",
        keyBenefits: [
          "Tightens loose skin & smooths wrinkles",
          "Accelerates wound healing",
          "Attracts immune repair cells to injury site",
          "Promotes hair follicle growth",
        ],
        mechanism:
          "Cheletes copper ions and modulates over 4,000 human genes toward youthful expression.",
        synergyPeps: ["BPC-157", "Epithalon"],
        targetOrgans: ["Dermis", "Extracellular Matrix", "Scalp Follicles"],
        scientificRating: 4.9,
      },
      {
        name: "KPV (Lysine-Proline-Valine)",
        category: "Anti-Inflammatory Tripeptide",
        primaryFunction:
          "Potent anti-inflammatory fragment of alpha-MSH targeting skin and gut inflammatory conditions.",
        keyBenefits: [
          "Soothes inflammatory bowel conditions",
          "Reduces skin redness & eczema flares",
          "Antimicrobial against pathogens",
        ],
        mechanism:
          "Inhibits NF-kB inflammatory transactivation directly within target tissues.",
        synergyPeps: ["BPC-157", "LL-37"],
        targetOrgans: ["Colon", "Epidermis", "Immune Cells"],
        scientificRating: 4.6,
      },
    ],
  },
  {
    id: 4,
    slug: "metabolism",
    title: "METABOLISM",
    subtitle:
      "Liver • Pancreas • Fat Tissue • Muscle • Mitochondria • Insulin Signaling",
    color: "orange",
    accentHex: "#fb923c",
    glowClass: "box-glow-purple",
    borderClass: "border-orange-500/60 hover:border-orange-400",
    bgGlowClass: "from-orange-900/40 to-orange-950/80",
    iconName: "Flame",
    side: "right",
    organs: [
      "Liver",
      "Pancreatic Beta Cells",
      "White/Brown Adipose Tissue",
      "Mitochondria",
      "Skeletal Muscle",
    ],
    description:
      "Metabolic reprogramming signals that regulate appetite pathways, optimize glucagon-like peptide receptors, mobilize visceral fat reserves, and enhance cellular insulin sensitivity.",
    badgeNumber: 4,
    pinPosition: { x: 39.7, y: 31.6 },
    featuredPepCard: "GLP-1 / GIP Dual Agonist Metabolic Protocol",
    clinicalResearchCount: 450,
    peptides: [
      {
        name: "Tirzepatide / Semaglutide Signals",
        category: "GLP-1 / GIP Dual Incretin Mimetics",
        primaryFunction:
          "Comprehensive metabolic recalibration, appetite regulation, and glucose-dependent insulin secretion.",
        keyBenefits: [
          "Dramatically reduces visceral & subcutaneous adiposity",
          "Enhances postprandial insulin response",
          "Reduces systemic glycemic variability",
          "Improves cardiovascular metabolic risk markers",
        ],
        mechanism:
          "Co-activates GIP and GLP-1 receptors in brainstem, pancreas, and gastrointestinal tract.",
        synergyPeps: ["AOD-9604", "MOTS-c", "5-Amino-1MQ"],
        targetOrgans: [
          "Pancreas",
          "Hypothalamus",
          "Visceral Adipose Tissue",
          "Liver",
        ],
        scientificRating: 5.0,
      },
      {
        name: "AOD-9604",
        category: "Lipolytic Fragment (hGH 177-191)",
        primaryFunction:
          "Triggers fat loss specifically by enhancing beta-3 adrenergic receptors on adipocytes without blood sugar elevation.",
        keyBenefits: [
          "Targets stubborn belly fat",
          "Prevents lipogenesis (new fat creation)",
          "Does not affect blood glucose or growth axis",
        ],
        mechanism:
          "Mimics the lipolytic region of hGH without binding to GH receptors.",
        synergyPeps: ["CJC-1295", "Ipamorelin", "MOTS-c"],
        targetOrgans: ["Adipocytes", "Subcutaneous Fat Depot"],
        scientificRating: 4.7,
      },
      {
        name: "MOTS-c",
        category: "Mitochondrial-Derived Peptide",
        primaryFunction:
          "Exercise mimetic that restores metabolic flexibility, enhances AMP-activated protein kinase (AMPK), and improves insulin sensitivity.",
        keyBenefits: [
          "Increases glucose uptake in muscle cells",
          "Protects against age-related metabolic decline",
          "Boosts physical endurance",
        ],
        mechanism:
          "Translocates to the cell nucleus during metabolic stress to regulate genomic gene expression.",
        synergyPeps: ["SS-31", "5-Amino-1MQ"],
        targetOrgans: ["Mitochondria", "Skeletal Muscle", "Liver"],
        scientificRating: 4.9,
      },
      {
        name: "5-Amino-1MQ",
        category: "NNMT Enzyme Inhibitor",
        primaryFunction:
          "Small molecule peptide signal that blocks Nicotinamide N-methyltransferase to increase intracellular NAD+ and basal metabolic rate.",
        keyBenefits: [
          "Accelerates fat metabolism",
          "Increases cellular NAD+ levels",
          "Prevents fat cell hypertrophy",
        ],
        mechanism:
          "Selective inhibition of NNMT enzyme in white adipose tissue.",
        synergyPeps: ["MOTS-c", "NAD+ Precursors"],
        targetOrgans: ["White Adipose Tissue", "Adipocytes"],
        scientificRating: 4.8,
      },
    ],
  },
  {
    id: 5,
    slug: "longevity-aging",
    title: "LONGEVITY & AGING",
    subtitle: "Mitochondria • Cells • DNA • Brain • Heart • Liver",
    color: "blue",
    accentHex: "#60a5fa",
    glowClass: "box-glow-cyan",
    borderClass: "border-blue-500/60 hover:border-blue-400",
    bgGlowClass: "from-blue-900/40 to-blue-950/80",
    iconName: "Shield",
    side: "right",
    organs: [
      "Telomeres & DNA",
      "Mitochondrial Matrix",
      "Stem Cell Niches",
      "Vascular Endothelium",
      "Cellular Matrix",
    ],
    description:
      "Deep cellular rejuvenation signals designed to extend telomere length, repair mitochondrial inner membrane bioenergetics, and clear senescent cellular debris.",
    badgeNumber: 5,
    pinPosition: { x: 49.8, y: 38.0 },
    featuredPepCard: "Epithalon Telomere & Circadian Clock Protocol",
    clinicalResearchCount: 220,
    peptides: [
      {
        name: "Epithalon (Epitalon)",
        category: "Telomerase Activator Bioregulator",
        primaryFunction:
          "Induces telomerase expression, elongating chromosome telomeres and normalizing pineal melatonin secretion.",
        keyBenefits: [
          "Extends cellular lifespan limits",
          "Restores circadian rhythm architecture",
          "Reduces spontaneous gene mutations",
          "Normalizes endocrine hormone pulses",
        ],
        mechanism:
          "Epigenetic chromatin un-silencing of the hTERT gene promoter.",
        synergyPeps: ["Thymalin", "Pinealon", "SS-31"],
        targetOrgans: ["Pineal Gland", "Stem Cells", "Telomeres"],
        scientificRating: 5.0,
      },
      {
        name: "SS-31 (Elamipretide)",
        category: "Mitochondrial Cardiolipin Target",
        primaryFunction:
          "Binds selectively to cardiolipin on inner mitochondrial membrane to restore ATP generation and eliminate ROS burst.",
        keyBenefits: [
          "Reverses age-related mitochondrial breakdown",
          "Improves organ cellular energy supply",
          "Protects against ischemic-reperfusion injury",
        ],
        mechanism:
          "Normalizes mitochondrial cristae structure and electron transport chain coupling.",
        synergyPeps: ["MOTS-c", "NAD+", "Epithalon"],
        targetOrgans: [
          "Inner Mitochondrial Membrane",
          "Heart Muscle",
          "Kidneys",
        ],
        scientificRating: 4.9,
      },
      {
        name: "FOXO4-DRI",
        category: "Senolytic Peptide Signal",
        primaryFunction:
          "Selectively induces apoptosis in senescent (zombie) cells without affecting healthy surrounding tissues.",
        keyBenefits: [
          "Removes pro-inflammatory senescent cell burden",
          "Restores tissue stem cell regenerative capacity",
          "Improves skin density & organ function",
        ],
        mechanism:
          "Disrupts the FOXO4-p53 interaction, driving senescent cells into programmed cell death.",
        synergyPeps: ["Rapamycin", "Dasatinib/Quercetin", "Epithalon"],
        targetOrgans: ["Senescent Tissues", "Skin", "Kidneys"],
        scientificRating: 4.8,
      },
      {
        name: "Thymalin / Thymogen",
        category: "Thymic Bioregulator",
        primaryFunction:
          "Restores age-degraded thymic gland function and normalizes T-cell differentiation.",
        keyBenefits: [
          "Reverses immune senescence",
          "Enhances T-cell surveillance",
          "Promotes systemic longevity",
        ],
        mechanism:
          "Regulates gene expression in thymocytes and systemic lymphoid organs.",
        synergyPeps: ["Epithalon", "TA1"],
        targetOrgans: ["Thymus Gland", "Spleen", "Lymph Nodes"],
        scientificRating: 4.7,
      },
    ],
  },
  {
    id: 6,
    slug: "immune-inflammation",
    title: "IMMUNE & INFLAMMATION",
    subtitle: "Immune System • Gut • Skin • Lungs • Inflammatory Pathways",
    color: "green",
    accentHex: "#4ade80",
    glowClass: "box-glow-cyan",
    borderClass: "border-emerald-500/60 hover:border-emerald-400",
    bgGlowClass: "from-emerald-900/40 to-emerald-950/80",
    iconName: "ShieldCheck",
    side: "right",
    organs: [
      "Thymus",
      "T-Lymphocytes",
      "Gut Mucosal Immune Barrier",
      "Pulmonary Epithelium",
      "Dermis",
    ],
    description:
      "Immune system calibrators that balance helper T-cell ratios, soothe systemic cytokine storms, strengthen mucosal defenses, and harmonize immune self-recognition.",
    badgeNumber: 6,
    pinPosition: { x: 58.9, y: 39.5 },
    featuredPepCard: "Thymosin Alpha-1 Immune Shield Protocol",
    clinicalResearchCount: 285,
    peptides: [
      {
        name: "Thymosin Alpha-1 (TA1)",
        category: "Immune Modulator Signal",
        primaryFunction:
          "Modulates cellular immunity by increasing T-cell helper (Th1) differentiation and natural killer cell activity.",
        keyBenefits: [
          "Strengthens defense against viral pathogens",
          "Prevents hyper-inflammatory cytokine excess",
          "Restores immune balance in auto-reactive states",
          "Supports chronic infection clearance",
        ],
        mechanism:
          "Signals through Toll-like receptors (TLRs) to activate dendritic cells and T-lymphocytes.",
        synergyPeps: ["LL-37", "BPC-157", "KPV"],
        targetOrgans: [
          "Thymus",
          "Dendritic Cells",
          "T-Cells",
          "Mucosal Surfaces",
        ],
        scientificRating: 5.0,
      },
      {
        name: "LL-37",
        category: "Host-Defense Antimicrobial Peptide",
        primaryFunction:
          "Broad-spectrum endogenous peptide antimicrobial that neutralizes bacterial endotoxins and biofilm structures.",
        keyBenefits: [
          "Disrupts resistant biofilm layers",
          "Neutralizes LPS endotoxin toxicity",
          "Promotes tissue wound repair and re-epithelialization",
        ],
        mechanism:
          "Disrupts pathogenic cell membranes via amphipathic pore formation.",
        synergyPeps: ["TA1", "BPC-157"],
        targetOrgans: ["Lungs", "Skin Barrier", "Gastrointestinal Tract"],
        scientificRating: 4.8,
      },
      {
        name: "VIP (Vasoactive Intestinal Peptide)",
        category: "Neuro-Immune Regulator",
        primaryFunction:
          "Downregulates microglial activation and systemic inflammatory cytokines in conditions like CIRS or mold exposure.",
        keyBenefits: [
          "Reduces brain & lung neuro-inflammation",
          "Improves pulmonary vascular resistance",
          "Normalizes CIRS lab biomarkers",
        ],
        mechanism:
          "Binds VPAC1 and VPAC2 receptors to suppress pro-inflammatory cytokine secretion.",
        synergyPeps: ["Synapsin", "TA1"],
        targetOrgans: ["Lungs", "Brain Microglia", "Gut Epithelium"],
        scientificRating: 4.7,
      },
      {
        name: "Larazotide Acetate (AT-1001)",
        category: "Tight Junction Regulator",
        primaryFunction:
          "Prevents intestinal hyper-permeability (leaky gut) by keeping tight junctions closed against zonulin triggering.",
        keyBenefits: [
          "Blocks zonulin-mediated mucosal leakage",
          "Prevents endotoxin leak into systemic circulation",
          "Calms systemic auto-immune flares",
        ],
        mechanism: "Antagonizes zonulin receptor signaling in enterocytes.",
        synergyPeps: ["BPC-157", "KPV"],
        targetOrgans: ["Small Intestine", "Enterocyte Junctions"],
        scientificRating: 4.7,
      },
    ],
  },
  {
    id: 7,
    slug: "cardiovascular-circulation",
    title: "CARDIOVASCULAR & CIRCULATION",
    subtitle:
      "Heart • Blood Vessels • Endothelium • Circulation • Vascular Repair",
    color: "red",
    accentHex: "#f87171",
    glowClass: "box-glow-pink",
    borderClass: "border-red-500/60 hover:border-red-400",
    bgGlowClass: "from-red-900/40 to-red-950/80",
    iconName: "HeartPulse",
    side: "right",
    organs: [
      "Myocardium",
      "Vascular Endothelium",
      "Coronary Arteries",
      "Capillary Bed",
      "Microvasculature",
    ],
    description:
      "Cardioprotective and hemodynamic peptide signals that upregulate nitric oxide synthesis, repair endothelial linings, optimize vascular elasticity, and support myocardial metabolism.",
    badgeNumber: 7,
    pinPosition: { x: 56.7, y: 24.8 },
    featuredPepCard: "Vasonatrin & Endothelial Vascular Repair PepCard",
    clinicalResearchCount: 175,
    peptides: [
      {
        name: "Vasonatrin Peptide (VNP)",
        category: "Vasoactive Natriuretic Chimera",
        primaryFunction:
          "Combines ANP and CNP properties to dilate blood vessels, lower peripheral resistance, and prevent cardiac remodeling.",
        keyBenefits: [
          "Promotes vasodilation & arterial elasticity",
          "Protects myocardium from ischemic injury",
          "Inhibits smooth muscle proliferation",
        ],
        mechanism:
          "Activates particulate guanylyl cyclase receptors (GC-A and GC-B) boosting intracellular cGMP.",
        synergyPeps: ["SS-31", "BPC-157", "TB-500"],
        targetOrgans: [
          "Coronary Arteries",
          "Vascular Smooth Muscle",
          "Myocardium",
        ],
        scientificRating: 4.8,
      },
      {
        name: "Angiotensin (1-7)",
        category: "Counter-Regulatory RAS Axis Signal",
        primaryFunction:
          "Protective arm of the Renin-Angiotensin System that opposes Angiotensin II damage, inducing vasodilation and anti-fibrotic effects.",
        keyBenefits: [
          "Inhibits cardiac fibrosis & stiffness",
          "Enhances endothelial nitric oxide release",
          "Protects kidney glomeruli",
        ],
        mechanism: "Activates the Mas G-protein coupled receptor.",
        synergyPeps: ["BPC-157", "SS-31"],
        targetOrgans: ["Heart Wall", "Renal Vessels", "Endothelium"],
        scientificRating: 4.8,
      },
      {
        name: "GHK-Cu (Vascular Mode)",
        category: "Angiogenic & Vascular Remodeling",
        primaryFunction:
          "Restores damaged vascular basement membranes and stimulates micro-capillary capillary formation in under-perfused tissues.",
        keyBenefits: [
          "Accelerates ischemic tissue reperfusion",
          "Protects endothelial integrity",
          "Reduces oxidative vascular injury",
        ],
        mechanism:
          "Regulates metalloproteinase secretion and endothelial cell migration.",
        synergyPeps: ["TB-500", "BPC-157"],
        targetOrgans: ["Vascular Endothelium", "Capillary Beds"],
        scientificRating: 4.9,
      },
      {
        name: "Corticorelin / Urocortin 2",
        category: "Inotropic Cardioprotective Signal",
        primaryFunction:
          "Potent inotropic agent that enhances cardiac output without excessive heart rate acceleration.",
        keyBenefits: [
          "Increases cardiac stroke volume efficiently",
          "Protects cardiomyocytes from ischemic stress",
          "Promotes peripheral vascular relaxation",
        ],
        mechanism:
          "Selective agonist at Corticotropin-Releasing Factor Receptor 2 (CRFR2).",
        synergyPeps: ["SS-31", "Epithalon"],
        targetOrgans: ["Left Ventricle", "Myocardium"],
        scientificRating: 4.7,
      },
    ],
  },
];

export const PILLARS_NAV = [
  {
    label: "EXPLORE",
    icon: "Compass",
    description: "Navigate 9 systemic biological axes",
    href: "https://peptribe.us",
  },
  {
    label: "SEE PEP CARDS",
    icon: "Search",
    description: "Analyze peptide secretagogues & signals",
    href: "https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6aa99ceb98106dcc4e1ffb6f.pdf",
  },
  {
    label: "JOIN PEPTRIBE",
    icon: "Network",
    description: "Explore synergistic stacking pathways",
    href: "https://peptribe.us/scout",
  },
  {
    label: "CALCULATOR",
    icon: "Target",
    description: "Design customized wellness protocols",
    href: "https://peptribe.us/calculator",
  },
];
