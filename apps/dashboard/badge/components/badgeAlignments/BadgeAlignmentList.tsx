'use client'
import { CompleteBadgeAlignment } from '@soco/badge-db/schema/badgeAlignments'
import { trpc } from '@/lib/trpc/client'
import BadgeAlignmentModal from './BadgeAlignmentModal'

export default function BadgeAlignmentList({
	badgeAlignments
}: {
	badgeAlignments: CompleteBadgeAlignment[]
}) {
	const { data: b } = trpc.badgeAlignments.getBadgeAlignments.useQuery(
		undefined,
		{
			initialData: { badgeAlignments },
			refetchOnMount: false
		}
	)

	if (b.badgeAlignments.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeAlignments.map((badgeAlignment) => (
				<BadgeAlignment
					badgeAlignment={badgeAlignment}
					key={badgeAlignment.id}
				/>
			))}
		</ul>
	)
}

const BadgeAlignment = ({
	badgeAlignment
}: {
	badgeAlignment: CompleteBadgeAlignment
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeAlignment.badgeId}</div>
			</div>
			<BadgeAlignmentModal badgeAlignment={badgeAlignment} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge alignments
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge alignment.
			</p>
			<div className='mt-6'>
				<BadgeAlignmentModal emptyState={true} />
			</div>
		</div>
	)
}
