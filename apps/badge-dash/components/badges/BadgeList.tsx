'use client'
import { CompleteBadge } from '@/lib/db/schema/badges'
import { trpc } from '@/lib/trpc/client'
import BadgeModal from './BadgeModal'

export default function BadgeList({ badges }: { badges: CompleteBadge[] }) {
	const { data: b } = trpc.badges.getBadges.useQuery(undefined, {
		initialData: { badges },
		refetchOnMount: false
	})

	if (b.badges.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badges.map((badge) => (
				<Badge
					badge={badge}
					key={badge.id}
				/>
			))}
		</ul>
	)
}

const Badge = ({ badge }: { badge: CompleteBadge }) => {
	return (
		<li className='flex justify-between my-2'>
			<div>{badge.attachment}</div>
			<div>{badge.name}</div>

			<BadgeModal badge={badge} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badges
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge.
			</p>
			<div className='mt-6'>
				<BadgeModal emptyState={true} />
			</div>
		</div>
	)
}
