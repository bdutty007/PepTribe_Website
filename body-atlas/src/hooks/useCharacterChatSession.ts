import { useCallback, useState } from "react";
import {
  CHAT_WIDGET_NAMESPACES,
  clearPepTribeChatSession,
} from "@/components/CharacterChatDrawer";
import type { PepCharacter } from "@/data/pepTeam";

/**
 * Per-character persistent chat-session hook.
 *
 * Each character gets its own stable sessionId that survives component
 * unmount/remount, drawer open/close, character switching, and page refresh.
 *
 * A sessionId is ONLY rotated when the user explicitly clicks "New Chat"
 * on that character — never on mount, unmount, drawer toggle, or switch.
 *
 * The ID is persisted under a narrowly-scoped PepTribe storage key:
 *   peptribe_chat_session_<characterId>
 *
 * The embedded widget's own conversation state (conversationId / history)
 * lives on the widgets.leadconnectorhq.com origin inside the iframe and
 * cannot be directly read by parent JS; we rely on the LeadConnector
 * widget restoring its conversation via its own storage/cookies keyed by
 * the widget-id + session. Rotating the parent-side sessionId + clearing
 * widget-namespaced storage forces the widget to re-initialize a fresh
 * conversation container for that character only.
 */

const PEPTRIBE_SESSION_PREFIX = "peptribe_chat_session_";

const loadStoredSessionId = (characterId: string): string | null => {
  try {
    const raw = localStorage.getItem(PEPTRIBE_SESSION_PREFIX + characterId);
    if (typeof raw === "string" && raw.length > 0) return raw;
  } catch {
    // storage unavailable — fall back to in-memory
  }
  return null;
};

const persistSessionId = (characterId: string, id: string) => {
  try {
    localStorage.setItem(PEPTRIBE_SESSION_PREFIX + characterId, id);
  } catch {
    // ignore — in-memory only
  }
};

const newSessionId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Clear ONLY this character's widget session state.
 *
 * - Removes LeadConnector widget-namespaced storage keys (lc_, leadconnector,
 *   chat, widget) that are shared by the embedded widget.
 * - Does NOT touch the stable PepTribe per-character session key until a new
 *   id is explicitly generated.
 *
 * Note: the LeadConnector widget's first-party storage lives cross-origin
 * inside the iframe, so parent JS cannot wipe it directly. We clear what the
 * parent document can reach (widget-namespaced keys on the parent origin) and
 * rely on the sessionId cache-bust + remount to force the widget to start a
 * fresh conversation for this character.
 */
export const resetCharacterWidgetStorage = (characterId: string) => {
  // Targeted widget-namespace removal (no broad clear()).
  clearPepTribeChatSession();

  // Remove this character's existing session marker so the next id is fresh.
  try {
    localStorage.removeItem(PEPTRIBE_SESSION_PREFIX + characterId);
  } catch {
    // ignore
  }
};

export interface CharacterSession {
  characterId: string;
  sessionId: string;
  /** Monotonic counter incremented ONLY when the user starts a new chat. */
  sessionNonce: number;
  startNewChat: () => void;
}

export const useCharacterChatSession = (
  character: PepCharacter,
): CharacterSession => {
  // Stable id for this character — loaded once, persisted, never rotated
  // except by an explicit "New Chat" action on THIS character.
  const [sessionId, setSessionId] = useState<string>(() => {
    const stored = loadStoredSessionId(character.id);
    if (stored) return stored;
    const fresh = newSessionId();
    persistSessionId(character.id, fresh);
    return fresh;
  });

  const [sessionNonce, setSessionNonce] = useState(0);

  const startNewChat = useCallback(() => {
    // Reset ONLY this character's widget storage + session marker.
    resetCharacterWidgetStorage(character.id);
    const fresh = newSessionId();
    persistSessionId(character.id, fresh);
    setSessionId(fresh);
    setSessionNonce((n) => n + 1);
  }, [character.id]);

  return {
    characterId: character.id,
    sessionId,
    sessionNonce,
    startNewChat,
  };
};
