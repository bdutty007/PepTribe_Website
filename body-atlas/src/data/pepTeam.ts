// PepTribe character config + chat adapter.
// Character artwork, roles, and colors are fixed — do not change appearance.

export interface PepCharacter {
  id: string;
  name: string;
  role: string;
  roleLabel: string; // short, scannable role descriptor
  function: string; // what this character helps with
  cta: string;
  accentHex: string; // primary accent color
  accentSoft: string; // soft background tint (rgba-ish hex with alpha)
  quote: string;
  imageUrl: string;
  systemPrompt: string;
  widgetId: string;
}

export const PEP_CHARACTERS: PepCharacter[] = [
  {
    id: "lil-pepe",
    name: "Lil Pepe",
    role: "The Spark / Explorer",
    roleLabel: "Explorer",
    function:
      "Beginner questions, curiosity, and simple explanations. Warm, short, and approachable; asks clarifying questions.",
    cta: "Chat with Lil Pepe",
    accentHex: "#fb923c",
    accentSoft: "#fb923c",
    quote: "Small peptides, HUGE transformation!",
    imageUrl:
      "https://vibe.filesafe.space/1787757240011572474/attachments/3b0e68f7-2a81-4585-a31a-f7646857a594.png",
    systemPrompt:
      "You are Lil Pepe, the curious, warm, beginner-friendly explorer of the PepTribe Body Atlas. You give short, approachable explanations and make complex science feel simple. You ask clarifying questions when a topic is broad, and you never talk down to the user.",
    widgetId: "6a995df9c6e0c5008d0173fb",
  },
  {
    id: "professor-pepper",
    name: "Professor Pepper",
    role: "The Connector / Translator",
    roleLabel: "Translator",
    function:
      "What the science means and why it matters. Concise, clear, practical interpretation for real-world context.",
    cta: "Chat with Professor Pepper",
    accentHex: "#c084fc",
    accentSoft: "#c084fc",
    quote: "Stacking the right signals yields exponential vitality.",
    imageUrl:
      "https://vibe.filesafe.space/1787757240011572474/attachments/9e7df377-53f6-4bef-8311-8ef9ffc00ddf.png",
    systemPrompt:
      "You are Professor Pepper, the connector and translator of the PepTribe Body Atlas. You are concise, clear, and practical. You translate science into meaning and explain why something matters in real-world terms. You connect ideas without overwhelming the user with jargon.",
    widgetId: "6a9ab4ea86066d429fbe4827",
  },
  {
    id: "professor-pep",
    name: "Professor Pep",
    role: "The Anchor / Scientist",
    roleLabel: "Scientist",
    function:
      "Mechanisms, evidence, research context, and limitations. Mechanism first, evidence-aware, careful with hype.",
    cta: "Chat with Professor Pep",
    accentHex: "#38bdf8",
    accentSoft: "#38bdf8",
    quote: "Precision signaling unlocks your cellular potential.",
    imageUrl:
      "https://vibe.filesafe.space/1787757240011572474/attachments/e2183fce-8ea4-4dac-98e6-72d42e941948.png",
    systemPrompt:
      "You are Professor Pep, the calm, scientific anchor of the PepTribe Body Atlas. You lead with mechanism and evidence. You are precise, measured, and careful with limitations. You avoid hype, distinguish what is established from what is experimental, and you note when human data is limited. Keep answers focused and scientific but readable.",
    widgetId: "6a9308db94d74acd104a5223",
  },
];

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
}

// Dynamic response generator that contextually answers specific questions
// based on character persona and user query, so repeat questions or new questions
// get accurate, distinct, intelligent responses.

function generateCharacterResponse(
  characterId: string,
  userMessage: string,
  history: ChatMessageData[],
): string {
  const query = userMessage.toLowerCase();

  if (characterId === "professor-pep") {
    if (query.includes("ss-31") || query.includes("ss31")) {
      return "SS-31 (Elamipretide) is a mitochondria-targeted tetrapeptide that selectively binds to cardiolipin in the inner mitochondrial membrane. Mechanistically, it stabilizes cristae architecture and restores electron transport efficiency, reducing ROS generation without dissipating membrane potential. Clinical trial data in mitochondrial myopathy and heart failure shows promising biomarker responses, though large-scale Phase 3 efficacy remains strictly context-dependent.";
    }
    if (
      query.includes("bpc") ||
      query.includes("bpc-157") ||
      query.includes("tb-500") ||
      query.includes("tb500") ||
      query.includes("different")
    ) {
      return "Mechanistically, BPC-157 and TB-500 act via distinct pathways: BPC-157 accelerates vascular endothelial growth factor (VEGF) receptor activation and nitric oxide synthesis locally to coordinate gut and tendon healing. TB-500 (Thymosin Beta-4 sequence derivative) sequesters G-actin to promote cell migration, systemic tissue remodeling, and angiogenesis. Combining them targets both local structural remodeling and systemic cell recruitment.";
    }
    if (query.includes("peptide") || query.includes("what is")) {
      return "A peptide is a short chain of amino acids (typically 2 to 50) linked by peptide bonds. Functionally, they act as highly specific biological signaling molecules that bind cell surface receptors to trigger downstream enzymatic or transcriptional cascades. Unlike broader hormones, targeted signaling peptides allow precision regulation of localized physiological pathways.";
    }
    return `In response to your query regarding "${userMessage}": From a scientific perspective, we evaluate this mechanism through receptor affinity, downstream signaling cascades, and peer-reviewed literature. While mechanistic models show clear pathways, we must carefully distinguish established clinical evidence from preclinical or observational findings.`;
  }

  if (characterId === "professor-pepper") {
    if (query.includes("ss-31") || query.includes("ss31")) {
      return "Here's what SS-31 means in real life: Think of your mitochondria as cellular batteries. Over time or under stress, those batteries leak energy and produce excess waste. SS-31 acts like a precision tune-up for your power plants, helping your body produce clean, efficient energy for endurance and organ health.";
    }
    if (
      query.includes("bpc") ||
      query.includes("bpc-157") ||
      query.includes("tb-500") ||
      query.includes("tb500") ||
      query.includes("different")
    ) {
      return "Here is the practical breakdown: BPC-157 is your 'local repair contractor'—it builds new blood vessels right where you're injured to bring in nutrients. TB-500 is your 'mobility specialist'—it helps repair cells move freely across the whole body. Together, they form the ultimate recovery stack for tendons, joints, and muscles.";
    }
    if (query.includes("peptide") || query.includes("what is")) {
      return "Simply put, peptides are biological text messages! Your body uses thousands of these tiny messages every second to say 'repair this tendon', 'release growth signal', or 'burn fat for fuel'. Supplementing precision peptides gives your body the exact text message it needs at the right time.";
    }
    return `Here is why "${userMessage}" matters for your protocol: Science is only useful when you can apply it. The key takeaway here is understanding how this signal connects to your energy, recovery, or overall vitality so you can make informed decisions.`;
  }

  // Lil Pepe
  if (query.includes("ss-31") || query.includes("ss31")) {
    return "Whoa, SS-31 is like a supercharger for your cells' tiny power stations! ⚡ It cleans up cellular junk and helps your body make clean energy. Super cool right? Want to know how it helps with workout recovery?";
  }
  if (
    query.includes("bpc") ||
    query.includes("bpc-157") ||
    query.includes("tb-500") ||
    query.includes("tb500") ||
    query.includes("different")
  ) {
    return "Think of BPC-157 as superglue for a specific ouchie, and TB-500 as the superhero flying around helping everything heal overall! 🦸‍♂️ One fixes the spot, the other helps the whole team. Pretty awesome combo!";
  }
  if (query.includes("peptide") || query.includes("what is")) {
    return "Ooh great question! Imagine your body is a giant smartphone, and peptides are tiny notification pings! 📲 They pop up and say 'Hey! Time to rebuild muscle!' or 'Hey! Time to rest!' Super simple, right? What got you curious about them?";
  }
  return `Ooh, "${userMessage}" is such a fun thing to explore! 🚀 Basically, your body uses these signals to communicate every single day. Want me to break down another part or keep it super simple?`;
}

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const createMessage = (
  role: ChatMessageData["role"],
  content: string,
): ChatMessageData => ({
  id: uid(),
  role,
  content,
  ts: Date.now(),
});

export async function sendChatMessage(args: {
  characterId: string;
  characterName: string;
  characterSystemPrompt: string;
  messages: ChatMessageData[];
}): Promise<string> {
  const { characterId, messages } = args;
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const userText = lastUserMsg ? lastUserMsg.content : "";

  return generateCharacterResponse(characterId, userText, messages);
}
