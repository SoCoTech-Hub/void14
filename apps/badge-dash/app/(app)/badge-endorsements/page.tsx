import BadgeEndorsementList from '@/components/badgeEndorsements/BadgeEndorsementList'
import NewBadgeEndorsementModal from '@/components/badgeEndorsements/BadgeEndorsementModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeEndorsements() {
	const { badgeEndorsements } =
		await api.badgeEndorsements.getBadgeEndorsements.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Endorsements</h1>
				<NewBadgeEndorsementModal />
			</div>
			<BadgeEndorsementList badgeEndorsements={badgeEndorsements} />
		</main>
	)
}
