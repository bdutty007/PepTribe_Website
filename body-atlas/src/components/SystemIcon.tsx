import {
  Brain,
  Zap,
  Activity,
  Flame,
  Shield,
  ShieldCheck,
  HeartPulse,
  Bone,
  Dumbbell,
} from "lucide-react";

const ICON_MAP = {
  Brain,
  Zap,
  Activity,
  Flame,
  Shield,
  ShieldCheck,
  HeartPulse,
  Bone,
  Dumbbell,
} as const;

type IconName = keyof typeof ICON_MAP;

interface Props {
  name: IconName;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const SystemIcon = ({
  name,
  className = "",
  size = 28,
  style,
}: Props) => {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component className={className} size={size} style={style} />;
};
