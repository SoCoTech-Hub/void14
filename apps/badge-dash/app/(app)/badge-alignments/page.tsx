import BadgeAlignmentList from '@/components/badgeAlignments/BadgeAlignmentList'
import NewBadgeAlignmentModal from '@/components/badgeAlignments/BadgeAlignmentModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeAlignments() {
	const { badgeAlignments } =
		await api.badgeAlignments.getBadgeAlignments.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Alignments</h1>
				<NewBadgeAlignmentModal />
			</div>
			<BadgeAlignmentList badgeAlignments={badgeAlignments} />
		</main>
	)
}
