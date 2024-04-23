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
        href: "/badge-relateds",
        title: "Badge Relateds",
        icon: Globe,
      },
      {
        href: "/badge-manual-awards",
        title: "Badge Manual Awards",
        icon: Globe,
      },
      {
        href: "/badge-issues",
        title: "Badge Issues",
        icon: Globe,
      },
      {
        href: "/badge-external-identifiers",
        title: "Badge External Identifiers",
        icon: Globe,
      },
      {
        href: "/badge-external-backpacks",
        title: "Badge External Backpacks",
        icon: Globe,
      },
      {
        href: "/badge-externals",
        title: "Badge Externals",
        icon: Globe,
      },
      {
        href: "/badge-endorsements",
        title: "Badge Endorsements",
        icon: Globe,
      },
      {
        href: "/badge-criteria-params",
        title: "Badge Criteria Params",
        icon: Globe,
      },
      {
        href: "/badge-criteria-mets",
        title: "Badge Criteria Mets",
        icon: Globe,
      },
      {
        href: "/badge-criterias",
        title: "Badge Criterias",
        icon: Globe,
      },
      {
        href: "/badge-backpack-oauth2s",
        title: "Badge Backpack Oauth2s",
        icon: Globe,
      },
      {
        href: "/badge-backpacks",
        title: "Badge Backpacks",
        icon: Globe,
      },
      {
        href: "/badge-alignments",
        title: "Badge Alignments",
        icon: Globe,
      },
      {
        href: "/badges",
        title: "Badges",
        icon: Globe,
      },
    ],
  },

];

