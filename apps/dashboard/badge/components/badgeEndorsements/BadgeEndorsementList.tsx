'use client'
import { CompleteBadgeEndorsement } from '@soco/badge-db/schema/badgeEndorsements'
import { trpc } from '@/lib/trpc/client'
import BadgeEndorsementModal from './BadgeEndorsementModal'

export default function BadgeEndorsementList({
	badgeEndorsements
}: {
	badgeEndorsements: CompleteBadgeEndorsement[]
}) {
	const { data: b } = trpc.badgeEndorsements.getBadgeEndorsements.useQuery(
		undefined,
		{
			initialData: { badgeEndorsements },
			refetchOnMount: false
		}
	)

	if (b.badgeEndorsements.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeEndorsements.map((badgeEndorsement) => (
				<BadgeEndorsement
					badgeEndorsement={badgeEndorsement}
					key={badgeEndorsement.id}
				/>
			))}
		</ul>
	)
}

const BadgeEndorsement = ({
	badgeEndorsement
}: {
	badgeEndorsement: CompleteBadgeEndorsement
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeEndorsement.badgeId}</div>
			</div>
			<BadgeEndorsementModal badgeEndorsement={badgeEndorsement} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge endorsements
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge endorsement.
			</p>
			<div className='mt-6'>
				<BadgeEndorsementModal emptyState={true} />
			</div>
		</div>
	)
}
