'use client'
import { CompleteBadgeIssue } from '@soco/badge-db/schema/badgeIssues'
import { trpc } from '@/lib/trpc/client'
import BadgeIssueModal from './BadgeIssueModal'

export default function BadgeIssueList({
	badgeIssues
}: {
	badgeIssues: CompleteBadgeIssue[]
}) {
	const { data: b } = trpc.badgeIssues.getBadgeIssues.useQuery(undefined, {
		initialData: { badgeIssues },
		refetchOnMount: false
	})

	if (b.badgeIssues.length === 0) {
		return <EmptyState />
	}

	return (
		<ul>
			{b.badgeIssues.map((badgeIssue) => (
				<BadgeIssue
					badgeIssue={badgeIssue}
					key={badgeIssue.id}
				/>
			))}
		</ul>
	)
}

const BadgeIssue = ({ badgeIssue }: { badgeIssue: CompleteBadgeIssue }) => {
	return (
		<li className='flex justify-between my-2'>
			<div className='w-full'>
				<div>{badgeIssue.badgeId}</div>
			</div>
			<BadgeIssueModal badgeIssue={badgeIssue} />
		</li>
	)
}

const EmptyState = () => {
	return (
		<div className='text-center'>
			<h3 className='mt-2 text-sm font-semibold text-secondary-foreground'>
				No badge issues
			</h3>
			<p className='mt-1 text-sm text-muted-foreground'>
				Get started by creating a new badge issue.
			</p>
			<div className='mt-6'>
				<BadgeIssueModal emptyState={true} />
			</div>
		</div>
	)
}
