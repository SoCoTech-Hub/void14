'use client'
import { CompleteBadgeExternalIdentifier } from '@soco/badge-db/schema/badgeExternalIdentifiers'
import { trpc } from '@/lib/trpc/client'
import BadgeExternalIdentifierModal from './BadgeExternalIdentifierModal'

export default function BadgeExternalIdentifierList({
	badgeExternalIdentifiers
}: {
	badgeExternalIdentifiers: CompleteBadgeExternalIdentifier[]
}) {
	const { data: b } =
		trpc.badgeExternalIdentifiers.getBadgeExternalIdentifiers.useQuery(
			undefined,
			{
				initialData: { badgeExternalIdentifiers },
				refetchOnMount: false
			}
		)

	if (b.badgeExternalIdentifiers.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeExternalIdentifiers.map((badgeExternalIdentifier) => (
				<BadgeExternalIdentifier
					badgeExternalIdentifier={badgeExternalIdentifier}
					key={badgeExternalIdentifier.id}
				/>
			))}
		</ul>
	)
}

const BadgeExternalIdentifier = ({
	badgeExternalIdentifier
}: {
	badgeExternalIdentifier: CompleteBadgeExternalIdentifier
}) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeExternalIdentifier.externalId}</div>
			</div>
			<BadgeExternalIdentifierModal
				badgeExternalIdentifier={badgeExternalIdentifier}
			/>
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge external identifiers
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge external identifier.
			</p>
			<div className='mt-6'>
				<BadgeExternalIdentifierModal emptyState={true} />
			</div>
		</div>
	)
}
