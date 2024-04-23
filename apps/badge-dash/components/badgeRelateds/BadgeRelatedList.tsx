'use client'
import { CompleteBadgeRelated } from '@/lib/db/schema/badgeRelateds'
import { trpc } from '@/lib/trpc/client'
import BadgeRelatedModal from './BadgeRelatedModal'

export default function BadgeRelatedList({
	badgeRelateds
}: {
	badgeRelateds: CompleteBadgeRelated[]
}) {
	const { data: b } = trpc.badgeRelateds.getBadgeRelateds.useQuery(undefined, {
		initialData: { badgeRelateds },
		refetchOnMount: false
	})

	if (b.badgeRelateds.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeRelateds.map((badgeRelated) => (
				<BadgeRelated
					badgeRelated={badgeRelated}
					key={badgeRelated.id}
				/>
			))}
		</ul>
	)
}

const BadgeRelated = ({
	badgeRelated
}: {
	badgeRelated: CompleteBadgeRelated
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeRelated.badgeId}</div>
			</div>
			<BadgeRelatedModal badgeRelated={badgeRelated} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge relateds
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge related.
			</p>
			<div className='mt-6'>
				<BadgeRelatedModal emptyState={true} />
			</div>
		</div>
	)
}
