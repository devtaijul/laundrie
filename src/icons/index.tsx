import { ICON_NAMES } from "@/config/icons.config";

interface IconProps {
  name: keyof typeof ICON_NAMES;
}
export const Icons = ({ name }: IconProps) => {
  const CustomIcon = ICON_NAMES[name];
  if (!CustomIcon) {
    return null;
  }
  return <CustomIcon />;
};
