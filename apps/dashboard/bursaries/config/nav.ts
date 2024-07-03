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
        href: "/bursary-responses",
        title: "Bursary Responses",
        icon: Globe,
      },
      {
        href: "/bursaries",
        title: "Bursaries",
        icon: Globe,
      },
      {
        href: "/bursary-categories",
        title: "Bursary Categories",
        icon: Globe,
      },
    ],
  },

];

