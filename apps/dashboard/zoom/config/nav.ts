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
        href: "/zoom-lessons",
        title: "Zoom Lessons",
        icon: Globe,
      },
      {
        href: "/zoom-meetings",
        title: "Zoom Meetings",
        icon: Globe,
      },
      {
        href: "/zooms",
        title: "Zooms",
        icon: Globe,
      },
    ],
  },

];
