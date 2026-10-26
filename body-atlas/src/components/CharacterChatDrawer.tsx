import { ChevronDown, RefreshCw, PlusCircle } from "lucide-react";
import type { PepCharacter } from "@/data/pepTeam";

interface Props {
  character: PepCharacter;
  isOpen: boolean;
  onClose: () => void;
  /** Stable session id for this character (persists across mount/unmount). */
  sessionId: string;
  /** Monotonic counter; changes ONLY on explicit "New Chat" for this character. */
  sessionNonce: number;
  /** Called when the user clicks "New Chat" inside this drawer. */
  onReset: () => void;
}

/**
 * Namespaces specifically associated with the embedded chat widgets.
 * Only keys whose name contains one of these tokens are considered
 * widget-owned and eligible for removal. Everything else (Body Atlas
 * state, navigation, preferences, auth, analytics, and the PepTribe
 * per-character session markers under `peptribe_chat_session_*`) is
 * left untouched.
 */
export const CHAT_WIDGET_NAMESPACES = [
  "lc_",
  "leadconnector",
  "chat",
  "widget",
] as const;

const isWidgetKey = (key: string): boolean =>
  CHAT_WIDGET_NAMESPACES.some((ns) => key.toLowerCase().includes(ns)) &&
  !key.startsWith("peptribe_chat_session_");

/**
 * Targeted reset of the embedded chat-widget session state.
 *
 * Removes ONLY localStorage / sessionStorage keys whose name belongs to a
 * chat-widget namespace (lc_, leadconnector, chat, widget) AND is not a
 * PepTribe per-character session marker. No broad clear() calls are used,
 * so unrelated PepTribe application state is preserved.
 *
 * Limitation: the widget's own first-party storage lives on the
 * widgets.leadconnectorhq.com origin inside its inner iframe. Parent-page
 * JavaScript cannot reach cross-origin iframe storage, so this helper
 * only resets what is accessible from the parent document. The stable
 * sessionId (see useCharacterChatSession) keeps the widget bound to the
 * same conversation across open/close; rotating it via "New Chat" forces
 * the widget to re-initialize a fresh conversation container.
 */
export const clearPepTribeChatSession = () => {
  try {
    const localKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && isWidgetKey(key)) localKeys.push(key);
    }
    localKeys.forEach((k) => localStorage.removeItem(k));

    const sessionKeys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && isWidgetKey(key)) sessionKeys.push(key);
    }
    sessionKeys.forEach((k) => sessionStorage.removeItem(k));
  } catch {
    // Storage may be unavailable (private mode / restrictions) — ignore.
  }
};

/**
 * Inline script injected into the widget iframe document.
 * Performs the SAME targeted (non-broad) removal inside the iframe's
 * own storage context. NOTE: this only runs on initial srcdoc load —
 * it does NOT run on drawer open/close because the iframe element is
 * only re-keyed (remounted) when sessionNonce changes (i.e. an explicit
 * "New Chat" for this character). Open/close no longer remount the
 * iframe, so the LeadConnector conversation persists across toggles.
 */
const WIDGET_STORAGE_RESET_SCRIPT = `
try {
  var namespaces = ["lc_", "leadconnector", "chat", "widget"];
  var isWidgetKey = function (k) {
    k = (k || "").toLowerCase();
    if (k.indexOf("peptribe_chat_session_") !== -1) return false;
    for (var i = 0; i < namespaces.length; i++) {
      if (k.indexOf(namespaces[i]) !== -1) return true;
    }
    return false;
  };
  var lk = [];
  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    if (key && isWidgetKey(key)) lk.push(key);
  }
  lk.forEach(function (k) { try { window.localStorage.removeItem(k); } catch (e) {} });
  var sk = [];
  for (var j = 0; j < window.sessionStorage.length; j++) {
    var skey = window.sessionStorage.key(j);
    if (skey && isWidgetKey(skey)) sk.push(skey);
  }
  sk.forEach(function (k) { try { window.sessionStorage.removeItem(k); } catch (e) {} });
} catch (e) {}
`;

export const CharacterChatDrawer = ({
  character,
  isOpen,
  onClose,
  sessionId,
  sessionNonce,
  onReset,
}: Props) => {
  const accent = character.accentHex;

  // Always render the iframe (keyed by stable sessionId + sessionNonce) so
  // that open/close does NOT remount it — preserving the LeadConnector
  // conversation. Only an explicit "New Chat" (onReset -> sessionNonce bump)
  // remounts. When collapsed we visually hide instead of unmounting.
  const srcDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        overflow: hidden;
      }
      chat-widget {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }
      chat-widget::part(iframe),
      iframe {
        border: none !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 700px !important;
      }
      #chat-widget-container,
      .chat-widget-container {
        width: 100% !important;
        height: 100% !important;
      }
    </style>
  </head>
  <body>
    <script>${WIDGET_STORAGE_RESET_SCRIPT}</script>
    <script 
      src="https://widgets.leadconnectorhq.com/loader.js?v=${sessionId}" 
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
      data-widget-id="${character.widgetId}">
    </script>
  </body>
</html>`;

  return (
    <div
      className="mt-4 rounded-2xl border transition-all duration-300 bg-black/40 backdrop-blur-md"
      style={{
        borderColor: `${accent}40`,
        boxShadow: `0 0 30px ${accent}20`,
      }}
    >
      {/* Header bar inside the expanded drawer */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          borderColor: `${accent}25`,
          background: `linear-gradient(90deg, ${accent}15 0%, transparent 100%)`,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accent }}
          />
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: accent }}
          >
            {character.name} Conversation AI Agent
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Start New Chat"
            aria-label="Start New Chat"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 border"
            style={{
              borderColor: `${accent}40`,
              backgroundColor: `${accent}15`,
              color: accent,
            }}
          >
            <PlusCircle size={13} />
            <span>New Chat</span>
          </button>
          <button
            onClick={onReset}
            title="Reload widget"
            aria-label="Reload widget"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={onClose}
            title="Minimize Chat"
            aria-label="Minimize chat"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Embedded Live Chat Widget iframe targeting this character's widget ID.
          Kept mounted (just visually hidden when collapsed) so open/close does
          NOT reset the LeadConnector conversation. Only sessionNonce changes
          (from an explicit "New Chat") remount the iframe. */}
      <div
        className="w-full relative bg-background/50 transition-all duration-300 overflow-hidden"
        style={{ height: isOpen ? "700px" : 0 }}
      >
        <iframe
          key={`${character.id}-${sessionNonce}-${sessionId}`}
          srcDoc={srcDoc}
          title={`Chat with ${character.name}`}
          className="w-full h-full border-0 rounded-b-2xl bg-transparent"
          allow="microphone; camera; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
};
