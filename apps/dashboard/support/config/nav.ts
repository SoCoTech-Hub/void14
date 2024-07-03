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
        href: "/support-comments",
        title: "Support Comments",
        icon: Globe,
      },
      {
        href: "/support-tickets",
        title: "Support Tickets",
        icon: Globe,
      },
      {
        href: "/support-topics",
        title: "Support Topics",
        icon: Globe,
      },
      {
        href: "/support-departments",
        title: "Support Departments",
        icon: Globe,
      },
      {
        href: "/support-statuses",
        title: "Support Statuses",
        icon: Globe,
      },
    ],
  },

];

