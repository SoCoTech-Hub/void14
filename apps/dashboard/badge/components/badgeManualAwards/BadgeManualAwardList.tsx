'use client'
import { CompleteBadgeManualAward } from '@soco/badge-db/schema/badgeManualAwards'
import { trpc } from '@/lib/trpc/client'
import BadgeManualAwardModal from './BadgeManualAwardModal'

export default function BadgeManualAwardList({
	badgeManualAwards
}: {
	badgeManualAwards: CompleteBadgeManualAward[]
}) {
	const { data: b } = trpc.badgeManualAwards.getBadgeManualAwards.useQuery(
		undefined,
		{
			initialData: { badgeManualAwards },
			refetchOnMount: false
		}
	)

	if (b.badgeManualAwards.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeManualAwards.map((badgeManualAward) => (
				<BadgeManualAward
					badgeManualAward={badgeManualAward}
					key={badgeManualAward.id}
				/>
			))}
		</ul>
	)
}

const BadgeManualAward = ({
	badgeManualAward
}: {
	badgeManualAward: CompleteBadgeManualAward
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeManualAward.badgeId}</div>
			</div>
			<BadgeManualAwardModal badgeManualAward={badgeManualAward} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge manual awards
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge manual award.
			</p>
			<div className='mt-6'>
				<BadgeManualAwardModal emptyState={true} />
			</div>
		</div>
	)
}
