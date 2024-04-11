import { SidebarLink } from '@/components/SidebarItems'
import { Cog, Globe, HomeIcon } from 'lucide-react'

type AdditionalLinks = {
	title: string
	links: SidebarLink[]
}

export const defaultLinks: SidebarLink[] = [
	{ href: '/dashboard', title: 'Home', icon: HomeIcon },
	{ href: '/account', title: 'Account', icon: Cog },
	{ href: '/settings', title: 'Settings', icon: Cog }
]

export const additionalLinks: AdditionalLinks[] = [
	{
		title: 'Entities',
		links: [
			{
				href: '/mass-mail-recipients',
				title: 'Mass Mail Recipients',
				icon: Globe
			},
			{
				href: '/mass-mail-messages',
				title: 'Mass Mail Messages',
				icon: Globe
			},
			{
				href: '/mass-mail-lists',
				title: 'Mass Mail Lists',
				icon: Globe
			}
		]
	}
]
