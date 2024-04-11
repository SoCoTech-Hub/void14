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
        href: "/addresses",
        title: "Addresses",
        icon: Globe,
      },
      {
        href: "/next-of-kins",
        title: "Next Of Kins",
        icon: Globe,
      },
      {
        href: "/genders",
        title: "Genders",
        icon: Globe,
      },
      {
        href: "/profiles",
        title: "Profiles",
        icon: Globe,
      },
    ],
  },

];

