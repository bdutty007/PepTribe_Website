import type { MascotCharacter } from "@/data/bodyAtlasData";
import { useState } from "react";

interface Props {
  mascot: MascotCharacter;
  index: number;
}

export const MascotCard = ({ mascot, index }: Props) => {
  const [imgError, setImgError] = useState(false);

  const getBadgeColor = () => {
    if (mascot.avatarBg.includes("cyan")) return "#38bdf8";
    if (mascot.avatarBg.includes("purple")) return "#c084fc";
    return "#fb923c";
  };

  const badgeColor = getBadgeColor();

  return (
    <div
      className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/5 bg-gradient-to-b ${mascot.avatarBg} backdrop-blur-sm hover:border-white/15 transition-all duration-500 hover:-translate-y-1`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Avatar with character image */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-2xl overflow-hidden border-2 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-white/5"
          style={{ borderColor: `${badgeColor}40` }}
        >
          {mascot.imageUrl && !imgError ? (
            <img
              src={mascot.imageUrl}
              alt={`${mascot.name} character`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center text-3xl ${mascot.avatarBg}`}
            >
              {index === 0 ? "🔬" : index === 1 ? "🧬" : "🚀"}
            </div>
          )}
        </div>

        {/* Status badge */}
        <span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full text-black"
          style={{ backgroundColor: badgeColor }}
        >
          {mascot.badge}
        </span>
      </div>

      {/* Info */}
      <div className="text-center">
        <h4
          className="text-sm font-extrabold tracking-wider text-foreground"
          style={{ fontFamily: "'PepTribe', sans-serif" }}
        >
          {mascot.name}
        </h4>
        <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
          {mascot.title}
        </p>
        <p className="text-[11px] italic text-muted-foreground/80 mt-2 leading-relaxed">
          &ldquo;{mascot.quote}&rdquo;
        </p>
        <p className="text-[10px] text-muted-foreground mt-2 leading-snug">
          {mascot.description}
        </p>
        <span
          className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-semibold"
          style={{
            backgroundColor: `${badgeColor}20`,
            color: badgeColor,
          }}
        >
          {mascot.specialty}
        </span>
      </div>
    </div>
  );
};
