import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { PepCharacter } from "@/data/pepTeam";
import { CharacterChatDrawer } from "@/components/CharacterChatDrawer";
import { useCharacterChatSession } from "@/hooks/useCharacterChatSession";
import type { ResetRequest } from "@/components/PepTeamSection";

interface Props {
  character: PepCharacter;
  isExpanded: boolean;
  onToggle: () => void;
  /** One-shot reset from the global "Start New Chat" button. This card only
   *  acts on it when resetRequest.id === character.id, then resets only its
   *  own session — leaving the other two characters' conversations intact. */
  resetRequest?: ResetRequest | null;
}

export const PepCharacterCard = ({
  character,
  isExpanded,
  onToggle,
  resetRequest,
}: Props) => {
  const [imgError, setImgError] = useState(false);
  const accent = character.accentHex;

  // Stable, per-character chat session. The sessionId persists across
  // mount/unmount, drawer open/close, character switching, and page refresh.
  // It is ONLY rotated when the user explicitly clicks "New Chat" for THIS
  // character — never on mount, unmount, open, close, or switch.
  const session = useCharacterChatSession(character);

  // P2 — Lazy-load the LeadConnector chat iframe. The iframe is NOT mounted
  // during initial page load. It mounts only the FIRST time the visitor opens
  // this character's chat. Once mounted it stays mounted for the rest of the
  // browser session (so open/close preserves the conversation); closing the
  // drawer just visually hides it. This avoids spinning up three cross-origin
  // widget iframes at startup.
  const [chatMounted, setChatMounted] = useState(false);
  useEffect(() => {
    if (isExpanded && !chatMounted) setChatMounted(true);
  }, [isExpanded, chatMounted]);

  // Apply a one-shot global reset ONLY when it targets this character.
  // Each invocation with a new `n` triggers exactly one reset for this
  // character only; the other characters are untouched.
  const lastAppliedN = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!resetRequest) return;
    if (resetRequest.id !== character.id) return;
    if (resetRequest.n === lastAppliedN.current) return;
    lastAppliedN.current = resetRequest.n;
    session.startNewChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetRequest]);

  return (
    <div
      className={`group relative flex flex-col rounded-3xl border-2 p-5 sm:p-6 backdrop-blur-md transition-all duration-500 ${
        isExpanded ? "scale-[1.01] z-10" : "hover:-translate-y-1"
      }`}
      style={{
        borderColor: isExpanded ? `${accent}60` : `${accent}30`,
        background: `linear-gradient(160deg, ${accent}10 0%, hsl(var(--card)) 60%, hsl(var(--background)) 100%)`,
        boxShadow: isExpanded
          ? `0 0 40px ${accent}25, inset 0 0 30px ${accent}08`
          : `0 0 20px ${accent}10`,
      }}
    >
      {/* Top row: avatar + role */}
      <div className="flex items-center gap-4">
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border-2 shadow-lg transition-transform duration-300 group-hover:scale-105"
          style={{ borderColor: `${accent}50` }}
        >
          {imgError ? (
            <div
              className="w-full h-full flex items-center justify-center text-2xl font-black"
              style={{ backgroundColor: `${accent}20`, color: accent }}
            >
              {character.name.charAt(0)}
            </div>
          ) : (
            <img
              src={character.imageUrl}
              alt={`${character.name} — ${character.role}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            {character.roleLabel}
          </span>
          <h3
            className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none"
            style={{
              color: "hsl(var(--foreground))",
              fontFamily: "'PepTribe', sans-serif",
            }}
          >
            {character.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug">
            {character.role}
          </p>
        </div>
      </div>

      {/* Function blurb */}
      <p className="text-sm text-foreground/75 leading-relaxed mt-4">
        {character.function}
      </p>

      {/* CTA button */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`chat-drawer-${character.id}`}
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        style={{
          background: isExpanded
            ? `${accent}18`
            : `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          color: isExpanded ? accent : "#fff",
          border: `1px solid ${accent}40`,
          boxShadow: isExpanded ? "none" : `0 6px 18px ${accent}33`,
        }}
      >
        <MessageCircle size={16} />
        {isExpanded ? "Close Chat" : character.cta}
      </button>

      {/* Expandable chat drawer. The LeadConnector iframe is lazy-mounted:
          it only appears after the visitor first opens this character's
          chat, then stays mounted (hidden when collapsed) so open/close
          preserves the conversation; only an explicit "New Chat" remounts. */}
      <div id={`chat-drawer-${character.id}`}>
        {chatMounted && (
          <CharacterChatDrawer
            character={character}
            isOpen={isExpanded}
            onClose={onToggle}
            sessionId={session.sessionId}
            sessionNonce={session.sessionNonce}
            onReset={session.startNewChat}
          />
        )}
      </div>
    </div>
  );
};
