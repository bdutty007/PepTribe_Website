import type { ChatMessageData } from "@/data/pepTeam";

interface Props {
  message: ChatMessageData;
  accentHex: string;
  avatarImage?: string;
  characterName?: string;
}

export const ChatMessage = ({
  message,
  accentHex,
  avatarImage,
  characterName,
}: Props) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-lg shrink-0 overflow-hidden border flex items-center justify-center text-[10px] font-bold"
        style={{
          borderColor: isUser ? "rgba(255,255,255,0.12)" : `${accentHex}40`,
          backgroundColor: isUser ? "rgba(255,255,255,0.06)" : `${accentHex}18`,
        }}
      >
        {isUser ? (
          <span className="text-muted-foreground">You</span>
        ) : avatarImage ? (
          <img
            src={avatarImage}
            alt={characterName ?? "Character"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span style={{ color: accentHex }}>AI</span>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{
          backgroundColor: isUser ? "hsl(var(--primary))" : `${accentHex}12`,
          color: isUser
            ? "hsl(var(--primary-foreground))"
            : "hsl(var(--foreground))",
          border: isUser ? "none" : `1px solid ${accentHex}22`,
        }}
      >
        {message.content}
      </div>
    </div>
  );
};
