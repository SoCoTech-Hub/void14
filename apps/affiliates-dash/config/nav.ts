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
        href: "/affiliates-transactions",
        title: "Affiliates Transactions",
        icon: Globe,
      },
      {
        href: "/affiliates-statuses",
        title: "Affiliates Statuses",
        icon: Globe,
      },
      {
        href: "/affiliates-settings",
        title: "Affiliates Settings",
        icon: Globe,
      },
      {
        href: "/affiliates-details",
        title: "Affiliates Details",
        icon: Globe,
      },
      {
        href: "/affiliates",
        title: "Affiliates",
        icon: Globe,
      },
    ],
  },

];

