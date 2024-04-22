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
        href: "/auth-oauth2-linked-logins",
        title: "Auth Oauth2 Linked Logins",
        icon: Globe,
      },
      {
        href: "/auth-lti-linked-logins",
        title: "Auth Lti Linked Logins",
        icon: Globe,
      },
    ],
  },

];

