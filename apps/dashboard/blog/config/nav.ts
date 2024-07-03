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
        href: "/blog-associations",
        title: "Blog Associations",
        icon: Globe,
      },
      {
        href: "/blog-externals",
        title: "Blog Externals",
        icon: Globe,
      },
      {
        href: "/blog-comments",
        title: "Blog Comments",
        icon: Globe,
      },
      {
        href: "/social-reactions",
        title: "Social Reactions",
        icon: Globe,
      },
      {
        href: "/social-icons",
        title: "Social Icons",
        icon: Globe,
      },
      {
        href: "/blogs",
        title: "Blogs",
        icon: Globe,
      },
    ],
  },

];

