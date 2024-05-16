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
        href: "/wiki-versions",
        title: "Wiki Versions",
        icon: Globe,
      },
      {
        href: "/wiki-synonyms",
        title: "Wiki Synonyms",
        icon: Globe,
      },
      {
        href: "/wiki-subwikis",
        title: "Wiki Subwikis",
        icon: Globe,
      },
      {
        href: "/wiki-locks",
        title: "Wiki Locks",
        icon: Globe,
      },
      {
        href: "/wiki-links",
        title: "Wiki Links",
        icon: Globe,
      },
      {
        href: "/wiki-pages",
        title: "Wiki Pages",
        icon: Globe,
      },
      {
        href: "/wikis",
        title: "Wikis",
        icon: Globe,
      },
    ],
  },

];

