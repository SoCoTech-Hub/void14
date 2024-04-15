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
        href: "/application-responses",
        title: "Application Responses",
        icon: Globe,
      },
      {
        href: "/job-applications",
        title: "Job Applications",
        icon: Globe,
      },
      {
        href: "/application-categories",
        title: "Application Categories",
        icon: Globe,
      },
    ],
  },

];

