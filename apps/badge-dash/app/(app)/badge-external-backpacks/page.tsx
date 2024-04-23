import BadgeExternalBackpackList from '@/components/badgeExternalBackpacks/BadgeExternalBackpackList'
import NewBadgeExternalBackpackModal from '@/components/badgeExternalBackpacks/BadgeExternalBackpackModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeExternalBackpacks() {
	const { badgeExternalBackpacks } =
		await api.badgeExternalBackpacks.getBadgeExternalBackpacks.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>
					Badge External Backpacks
				</h1>
				<NewBadgeExternalBackpackModal />
			</div>
			<BadgeExternalBackpackList
				badgeExternalBackpacks={badgeExternalBackpacks}
			/>
		</main>
	)
}
