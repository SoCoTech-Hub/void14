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
        href: "/assign-submission-online-texts",
        title: "Assign Submission Online Texts",
        icon: Globe,
      },
      {
        href: "/assign-submission-files",
        title: "Assign Submission Files",
        icon: Globe,
      },
      {
        href: "/assignment-upgrades",
        title: "Assignment Upgrades",
        icon: Globe,
      },
      {
        href: "/assignment-submissions",
        title: "Assignment Submissions",
        icon: Globe,
      },
      {
        href: "/assign-feedback-files",
        title: "Assign Feedback Files",
        icon: Globe,
      },
      {
        href: "/assign-feedback-editpdf-rots",
        title: "Assign Feedback Editpdf Rots",
        icon: Globe,
      },
      {
        href: "/assign-feedback-editpdf-quicks",
        title: "Assign Feedback Editpdf Quicks",
        icon: Globe,
      },
      {
        href: "/assign-feedback-editpdf-queues",
        title: "Assign Feedback Editpdf Queues",
        icon: Globe,
      },
      {
        href: "/assign-feedback-editpdf-cmnts",
        title: "Assign Feedback Editpdf Cmnts",
        icon: Globe,
      },
      {
        href: "/assign-feedback-editpdf-annots",
        title: "Assign Feedback Editpdf Annots",
        icon: Globe,
      },
      {
        href: "/assign-feedback-comments",
        title: "Assign Feedback Comments",
        icon: Globe,
      },
      {
        href: "/assign-user-mappings",
        title: "Assign User Mappings",
        icon: Globe,
      },
      {
        href: "/assign-user-flags",
        title: "Assign User Flags",
        icon: Globe,
      },
      {
        href: "/assign-submissions",
        title: "Assign Submissions",
        icon: Globe,
      },
      {
        href: "/assign-plugin-configs",
        title: "Assign Plugin Configs",
        icon: Globe,
      },
      {
        href: "/assign-overrides",
        title: "Assign Overrides",
        icon: Globe,
      },
      {
        href: "/assign-grades",
        title: "Assign Grades",
        icon: Globe,
      },
      {
        href: "/assignments",
        title: "Assignments",
        icon: Globe,
      },
      {
        href: "/assigns",
        title: "Assigns",
        icon: Globe,
      },
    ],
  },

];

