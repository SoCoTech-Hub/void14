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
        href: "/admin-preset-plugs",
        title: "Admin Preset Plugs",
        icon: Globe,
      },
      {
        href: "/admin-preset-it-as",
        title: "Admin Preset It As",
        icon: Globe,
      },
      {
        href: "/admin-preset-its",
        title: "Admin Preset Its",
        icon: Globe,
      },
      {
        href: "/admin-preset-app-plugs",
        title: "Admin Preset App Plugs",
        icon: Globe,
      },
      {
        href: "/admin-presets-apps",
        title: "Admin Presets Apps",
        icon: Globe,
      },
      {
        href: "/admin-presets",
        title: "Admin Presets",
        icon: Globe,
      },
    ],
  },

];

