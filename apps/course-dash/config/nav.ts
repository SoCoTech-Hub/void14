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
		title: 'Courses',
		links: [
			{
				href: '/course-sections',
				title: 'Course Sections',
				icon: Globe
			},
			{
				href: '/course-requests',
				title: 'Course Requests',
				icon: Globe
			},
			{
				href: '/course-publishes',
				title: 'Course Publishes',
				icon: Globe
			},
			{
				href: '/course-modules-completions',
				title: 'Course Modules Completions',
				icon: Globe
			},
			{
				href: '/course-modules',
				title: 'Course Modules',
				icon: Globe
			},
			{
				href: '/course-format-options',
				title: 'Course Format Options',
				icon: Globe
			},
			{
				href: '/course-completions',
				title: 'Course Completions',
				icon: Globe
			},
			{
				href: '/course-completion-defaults',
				title: 'Course Completion Defaults',
				icon: Globe
			},
			{
				href: '/course-completion-criterias',
				title: 'Course Completion Criterias',
				icon: Globe
			},
			{
				href: '/course-completion-crit-compls',
				title: 'Course Completion Crit Compls',
				icon: Globe
			},
			{
				href: '/courses',
				title: 'Courses',
				icon: Globe
			},
			{
				href: '/course-categories',
				title: 'Course Categories',
				icon: Globe
			}
		]
	}
]
