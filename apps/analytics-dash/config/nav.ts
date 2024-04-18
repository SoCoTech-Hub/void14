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
        href: "/analytics-models-logs",
        title: "Analytics Models Logs",
        icon: Globe,
      },
      {
        href: "/analytics-used-files",
        title: "Analytics Used Files",
        icon: Globe,
      },
      {
        href: "/analytics-used-analysables",
        title: "Analytics Used Analysables",
        icon: Globe,
      },
      {
        href: "/analytics-train-samples",
        title: "Analytics Train Samples",
        icon: Globe,
      },
      {
        href: "/analytics-predictions",
        title: "Analytics Predictions",
        icon: Globe,
      },
      {
        href: "/analytics-prediction-actions",
        title: "Analytics Prediction Actions",
        icon: Globe,
      },
      {
        href: "/analytics-predict-samples",
        title: "Analytics Predict Samples",
        icon: Globe,
      },
      {
        href: "/analytics-models-log",
        title: "Analytics Models Log",
        icon: Globe,
      },
      {
        href: "/analytics-models",
        title: "Analytics Models",
        icon: Globe,
      },
      {
        href: "/analytics-indicator-calcs",
        title: "Analytics Indicator Calcs",
        icon: Globe,
      },
    ],
  },

];

