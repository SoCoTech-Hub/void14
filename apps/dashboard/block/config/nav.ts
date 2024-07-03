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
        href: "/block-rss-clients",
        title: "Block Rss Clients",
        icon: Globe,
      },
      {
        href: "/block-recently-accessed-items",
        title: "Block Recently Accessed Items",
        icon: Globe,
      },
      {
        href: "/block-recent-activities",
        title: "Block Recent Activities",
        icon: Globe,
      },
      {
        href: "/block-positions",
        title: "Block Positions",
        icon: Globe,
      },
      {
        href: "/block-instances",
        title: "Block Instances",
        icon: Globe,
      },
      {
        href: "/blocks",
        title: "Blocks",
        icon: Globe,
      },
    ],
  },

];

