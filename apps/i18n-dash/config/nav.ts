import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: Cog },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/localization-users",
        title: "Localization Users",
        icon: Globe,
      },
      {
        href: "/localization-translations",
        title: "Localization Translations",
        icon: Globe,
      },
      {
        href: "/localization-fields",
        title: "Localization Fields",
        icon: Globe,
      },
      {
        href: "/localization-languages",
        title: "Localization Languages",
        icon: Globe,
      },
    ],
  },

];

