import type React from "react";
import { Compass, Search, Network, Target } from "lucide-react";

const NAV_ICONS = { Compass, Search, Network, Target } as const;

interface NavItem {
  label: string;
  icon: string;
  description: string;
  href: string;
}

interface Props {
  items: NavItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const NavigationPillars = ({ items, activeIndex, onSelect }: Props) => {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      aria-label="Atlas navigation pillars"
    >
      {items.map((item, i) => {
        const Icon = (NAV_ICONS as any)[item.icon];
        const isActive = i === activeIndex;

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onSelect(i)}
            className={`group flex items-center gap-3 px-5 py-3 rounded-full border-2 backdrop-blur-sm transition-all duration-300 ${
              isActive
                ? "border-primary/60 bg-primary/10 scale-105 shadow-lg"
                : "border-white/10 bg-card/50 hover:border-white/25 hover:bg-card/80 hover:scale-102"
            }`}
            title={item.description}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {Icon && <Icon size={20} />}
            </div>
            <span
              className={`font-bold tracking-wider text-sm hidden sm:inline ${isActive ? "text-primary" : "text-foreground/80"}`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};
