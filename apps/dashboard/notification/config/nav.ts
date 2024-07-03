import { SidebarLink } from '@/components/SidebarItems'
import { Cog, Globe, HomeIcon } from 'lucide-react'

type AdditionalLinks = {
	title: string
	links: SidebarLink[]
}

export const additionalLinks: AdditionalLinks[] = [
	{
		title: 'Entities',
		links: [
			{
				href: '/notifications',
				title: 'Notifications',
				icon: Globe
			},
			{
				href: '/notification-responses',
				title: 'Notification Responses',
				icon: Globe
			}
		]
	}
]

export const defaultLinks: SidebarLink[] = [
	{ href: '/dashboard', title: 'Home', icon: HomeIcon },
	{ href: '/account', title: 'Account', icon: Cog },
	{ href: '/settings', title: 'Settings', icon: Cog }
]
