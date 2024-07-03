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
        href: "/forum-track-prefs",
        title: "Forum Track Prefs",
        icon: Globe,
      },
      {
        href: "/forum-subscriptions",
        title: "Forum Subscriptions",
        icon: Globe,
      },
      {
        href: "/forum-reads",
        title: "Forum Reads",
        icon: Globe,
      },
      {
        href: "/forum-queues",
        title: "Forum Queues",
        icon: Globe,
      },
      {
        href: "/forum-posts",
        title: "Forum Posts",
        icon: Globe,
      },
      {
        href: "/forum-grades",
        title: "Forum Grades",
        icon: Globe,
      },
      {
        href: "/forum-discussions",
        title: "Forum Discussions",
        icon: Globe,
      },
      {
        href: "/forum-discussion-subs",
        title: "Forum Discussion Subs",
        icon: Globe,
      },
      {
        href: "/forum-digests",
        title: "Forum Digests",
        icon: Globe,
      },
      {
        href: "/forums",
        title: "Forums",
        icon: Globe,
      },
    ],
  },

];

