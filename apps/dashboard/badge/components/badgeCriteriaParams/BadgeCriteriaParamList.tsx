'use client'
import { CompleteBadgeCriteriaParam } from '@soco/badge-db/schema/badgeCriteriaParams'
import { trpc } from '@/lib/trpc/client'
import BadgeCriteriaParamModal from './BadgeCriteriaParamModal'

export default function BadgeCriteriaParamList({
	badgeCriteriaParams
}: {
	badgeCriteriaParams: CompleteBadgeCriteriaParam[]
}) {
	const { data: b } = trpc.badgeCriteriaParams.getBadgeCriteriaParams.useQuery(
		undefined,
		{
			initialData: { badgeCriteriaParams },
			refetchOnMount: false
		}
	)

	if (b.badgeCriteriaParams.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeCriteriaParams.map((badgeCriteriaParam) => (
				<BadgeCriteriaParam
					badgeCriteriaParam={badgeCriteriaParam}
					key={badgeCriteriaParam.id}
				/>
			))}
		</ul>
	)
}

const BadgeCriteriaParam = ({
	badgeCriteriaParam
}: {
	badgeCriteriaParam: CompleteBadgeCriteriaParam
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeCriteriaParam.badgeCriteriaId}</div>
			</div>
			<BadgeCriteriaParamModal badgeCriteriaParam={badgeCriteriaParam} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge criteria params
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge criteria param.
			</p>
			<div className='mt-6'>
				<BadgeCriteriaParamModal emptyState={true} />
			</div>
		</div>
	)
}
