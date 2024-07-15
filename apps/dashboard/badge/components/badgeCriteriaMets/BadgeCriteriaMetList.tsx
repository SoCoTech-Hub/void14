'use client'
import { CompleteBadgeCriteriaMet } from '@soco/badge-db/schema/badgeCriteriaMets'
import { trpc } from '@/lib/trpc/client'
import BadgeCriteriaMetModal from './BadgeCriteriaMetModal'

export default function BadgeCriteriaMetList({
	badgeCriteriaMets
}: {
	badgeCriteriaMets: CompleteBadgeCriteriaMet[]
}) {
	const { data: b } = trpc.badgeCriteriaMets.getBadgeCriteriaMets.useQuery(
		undefined,
		{
			initialData: { badgeCriteriaMets },
			refetchOnMount: false
		}
	)

	if (b.badgeCriteriaMets.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeCriteriaMets.map((badgeCriteriaMet) => (
				<BadgeCriteriaMet
					badgeCriteriaMet={badgeCriteriaMet}
					key={badgeCriteriaMet.id}
				/>
			))}
		</ul>
	)
}

const BadgeCriteriaMet = ({
	badgeCriteriaMet
}: {
	badgeCriteriaMet: CompleteBadgeCriteriaMet
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeCriteriaMet.badgeCriteriaId}</div>
			</div>
			<BadgeCriteriaMetModal badgeCriteriaMet={badgeCriteriaMet} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge criteria mets
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge criteria met.
			</p>
			<div className='mt-6'>
				<BadgeCriteriaMetModal emptyState={true} />
			</div>
		</div>
	)
}
