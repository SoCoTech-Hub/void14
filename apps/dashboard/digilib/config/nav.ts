import { SidebarLink } from "@/components/SidebarItems";
import { BookA, Cog, Globe, HomeIcon } from "lucide-react";

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
		title: 'Entities',
		links: [
			{
				href: '/digilib-categories',
				title: 'Digilib Categories',
				icon: Globe
			},
			{
				href: '/digilibs',
				title: 'Digilibs',
				icon: BookA
			},
		]
	}
]

