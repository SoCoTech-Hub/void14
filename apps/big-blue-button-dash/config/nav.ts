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
        href: "/big-blue-button-bn-recordings",
        title: "Big Blue Button Bn Recordings",
        icon: Globe,
      },
      {
        href: "/big-blue-button-bn-logs",
        title: "Big Blue Button Bn Logs",
        icon: Globe,
      },
      {
        href: "/big-blue-button-bns",
        title: "Big Blue Button Bns",
        icon: Globe,
      },
    ],
  },

];

