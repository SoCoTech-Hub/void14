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
        href: "/workshop-form-rubric-levels",
        title: "Workshop Form Rubric Levels",
        icon: Globe,
      },
      {
        href: "/workshop-form-rubric-configs",
        title: "Workshop Form Rubric Configs",
        icon: Globe,
      },
      {
        href: "/workshop-form-rubrics",
        title: "Workshop Form Rubrics",
        icon: Globe,
      },
      {
        href: "/workshop-form-num-error-maps",
        title: "Workshop Form Num Error Maps",
        icon: Globe,
      },
      {
        href: "/workshop-form-num-errors",
        title: "Workshop Form Num Errors",
        icon: Globe,
      },
      {
        href: "/workshop-form-comments",
        title: "Workshop Form Comments",
        icon: Globe,
      },
      {
        href: "/workshop-form-accumulatives",
        title: "Workshop Form Accumulatives",
        icon: Globe,
      },
      {
        href: "/workshop-eval-best-settings",
        title: "Workshop Eval Best Settings",
        icon: Globe,
      },
      {
        href: "/workshop-allocation-schedules",
        title: "Workshop Allocation Schedules",
        icon: Globe,
      },
      {
        href: "/workshop-submissions",
        title: "Workshop Submissions",
        icon: Globe,
      },
      {
        href: "/workshop-grades",
        title: "Workshop Grades",
        icon: Globe,
      },
      {
        href: "/workshop-assessments",
        title: "Workshop Assessments",
        icon: Globe,
      },
      {
        href: "/workshop-aggregations",
        title: "Workshop Aggregations",
        icon: Globe,
      },
      {
        href: "/workshops",
        title: "Workshops",
        icon: Globe,
      },
    ],
  },

];

