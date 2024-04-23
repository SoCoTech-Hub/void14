import BadgeRelatedList from '@/components/badgeRelateds/BadgeRelatedList'
import NewBadgeRelatedModal from '@/components/badgeRelateds/BadgeRelatedModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeRelateds() {
	const { badgeRelateds } = await api.badgeRelateds.getBadgeRelateds.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Relateds</h1>
				<NewBadgeRelatedModal />
			</div>
			<BadgeRelatedList badgeRelateds={badgeRelateds} />
		</main>
	)
}
