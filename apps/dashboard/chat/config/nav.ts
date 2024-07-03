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
        href: "/chat-users",
        title: "Chat Users",
        icon: Globe,
      },
      {
        href: "/chat-messages-currents",
        title: "Chat Messages Currents",
        icon: Globe,
      },
      {
        href: "/chat-messages",
        title: "Chat Messages",
        icon: Globe,
      },
      {
        href: "/chats",
        title: "Chats",
        icon: Globe,
      },
    ],
  },

];

