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
        href: "/social-emojis",
        title: "Social Emojis",
        icon: Globe,
      },
      {
        href: "/socials",
        title: "Socials",
        icon: Globe,
      },
      {
        href: "/social-shares",
        title: "Social Shares",
        icon: Globe,
      },
      {
        href: "/social-links",
        title: "Social Links",
        icon: Globe,
      },
    ],
  },

];

