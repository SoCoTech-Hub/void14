'use client'
import { CompleteBadgeCriteria } from '@/lib/db/schema/badgeCriterias'
import { trpc } from '@/lib/trpc/client'
import BadgeCriteriaModal from './BadgeCriteriaModal'

export default function BadgeCriteriaList({
	badgeCriterias
}: {
	badgeCriterias: CompleteBadgeCriteria[]
}) {
	const { data: b } = trpc.badgeCriterias.getBadgeCriterias.useQuery(
		undefined,
		{
			initialData: { badgeCriterias },
			refetchOnMount: false
		}
	)

	if (b.badgeCriterias.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeCriterias.map((badgeCriteria) => (
				<BadgeCriteria
					badgeCriteria={badgeCriteria}
					key={badgeCriteria.id}
				/>
			))}
		</ul>
	)
}

const BadgeCriteria = ({
	badgeCriteria
}: {
	badgeCriteria: CompleteBadgeCriteria
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeCriteria.badgeId}</div>
			</div>
			<BadgeCriteriaModal badgeCriteria={badgeCriteria} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge criterias
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge criteria.
			</p>
			<div className='mt-6'>
				<BadgeCriteriaModal emptyState={true} />
			</div>
		</div>
	)
}
