import BadgeExternalList from '@/components/badgeExternals/BadgeExternalList'
import NewBadgeExternalModal from '@/components/badgeExternals/BadgeExternalModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeExternals() {
	const { badgeExternals } = await api.badgeExternals.getBadgeExternals.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Externals</h1>
				<NewBadgeExternalModal />
			</div>
			<BadgeExternalList badgeExternals={badgeExternals} />
		</main>
	)
}
