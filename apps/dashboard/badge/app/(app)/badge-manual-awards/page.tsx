import BadgeManualAwardList from '@/components/badgeManualAwards/BadgeManualAwardList'
import NewBadgeManualAwardModal from '@/components/badgeManualAwards/BadgeManualAwardModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeManualAwards() {
	const { badgeManualAwards } =
		await api.badgeManualAwards.getBadgeManualAwards.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Manual Awards</h1>
				<NewBadgeManualAwardModal />
			</div>
			<BadgeManualAwardList badgeManualAwards={badgeManualAwards} />
		</main>
	)
}
