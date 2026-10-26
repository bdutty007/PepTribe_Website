// PepTribe Body Atlas — Peptide Bioregulator reference module.
// This is a secondary reference panel, NOT a 10th body system.
// Each entry maps to an existing Atlas compound record (matched by name,
// case-insensitive) so clicking reuses the existing peptide detail modal.

export interface Bioregulator {
  name: string;
  tissue: string;
  system: string;
  color: string;
}

export const BIOREGULATORS: Bioregulator[] = [
  {
    name: "Bronchogen",
    tissue: "Lung / Bronchial Tissue",
    system: "Immune & Protective",
    color: "#D92A8A",
  },
  {
    name: "Cardiogen",
    tissue: "Heart / Cardiac Tissue",
    system: "Cardiovascular",
    color: "#9E1734",
  },
  {
    name: "Cartalax",
    tissue: "Cartilage / Joints",
    system: "Musculoskeletal",
    color: "#1468D4",
  },
  {
    name: "Chonluten",
    tissue: "Respiratory / Bronchial Tissue",
    system: "Immune & Protective",
    color: "#D92A8A",
  },
  {
    name: "Cortagen",
    tissue: "Brain / Cerebral Cortex",
    system: "Cognitive & Nervous System",
    color: "#7C3DB5",
  },
  {
    name: "Crystagen",
    tissue: "Thymus / Immune",
    system: "Immune & Protective",
    color: "#D92A8A",
  },
  {
    name: "Epitalon",
    tissue: "Pineal / Neuroendocrine",
    system: "Longevity & Cellular Health",
    color: "#C69214",
  },
  {
    name: "Livagen",
    tissue: "Liver",
    system: "Longevity & Cellular Health",
    color: "#C69214",
  },
  {
    name: "Ovagen",
    tissue: "Liver / GI",
    system: "Metabolic & Body Composition",
    color: "#F57C00",
  },
  {
    name: "Pancragen",
    tissue: "Pancreas",
    system: "Metabolic & Body Composition",
    color: "#F57C00",
  },
  {
    name: "Pinealon",
    tissue: "Brain / Pineal / CNS",
    system: "Cognitive & Nervous System",
    color: "#7C3DB5",
  },
  {
    name: "Prostamax",
    tissue: "Prostate",
    system: "Hormonal & Reproductive",
    color: "#E22632",
  },
  {
    name: "Testagen",
    tissue: "Testicular / Reproductive",
    system: "Hormonal & Reproductive",
    color: "#E22632",
  },
  {
    name: "Vesugen",
    tissue: "Blood Vessels / Endothelium",
    system: "Cardiovascular",
    color: "#9E1734",
  },
  {
    name: "Vilon",
    tissue: "Thymus / Immune",
    system: "Immune & Protective",
    color: "#D92A8A",
  },
];
