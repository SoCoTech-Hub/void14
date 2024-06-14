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
        href: "/glossary-formats",
        title: "Glossary Formats",
        icon: Globe,
      },
      {
        href: "/glossary-entries-categories",
        title: "Glossary Entries Categories",
        icon: Globe,
      },
      {
        href: "/glossary-entries",
        title: "Glossary Entries",
        icon: Globe,
      },
      {
        href: "/glossary-categories",
        title: "Glossary Categories",
        icon: Globe,
      },
      {
        href: "/glossary-aliases",
        title: "Glossary Aliases",
        icon: Globe,
      },
      {
        href: "/glossaries",
        title: "Glossaries",
        icon: Globe,
      },
    ],
  },

];

