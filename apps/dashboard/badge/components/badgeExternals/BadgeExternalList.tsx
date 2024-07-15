'use client'
import { CompleteBadgeExternal } from '@soco/badge-db/schema/badgeExternals'
import { trpc } from '@/lib/trpc/client'
import BadgeExternalModal from './BadgeExternalModal'

export default function BadgeExternalList({
	badgeExternals
}: {
	badgeExternals: CompleteBadgeExternal[]
}) {
	const { data: b } = trpc.badgeExternals.getBadgeExternals.useQuery(
		undefined,
		{
			initialData: { badgeExternals },
			refetchOnMount: false
		}
	)

	if (b.badgeExternals.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeExternals.map((badgeExternal) => (
				<BadgeExternal
					badgeExternal={badgeExternal}
					key={badgeExternal.id}
				/>
			))}
		</ul>
	)
}

const BadgeExternal = ({
	badgeExternal
}: {
	badgeExternal: CompleteBadgeExternal
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeExternal.assertion}</div>
			</div>
			<BadgeExternalModal badgeExternal={badgeExternal} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge externals
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge external.
			</p>
			<div className='mt-6'>
				<BadgeExternalModal emptyState={true} />
			</div>
		</div>
	)
}
