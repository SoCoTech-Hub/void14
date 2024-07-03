import BadgeExternalIdentifierList from '@/components/badgeExternalIdentifiers/BadgeExternalIdentifierList'
import NewBadgeExternalIdentifierModal from '@/components/badgeExternalIdentifiers/BadgeExternalIdentifierModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeExternalIdentifiers() {
	const { badgeExternalIdentifiers } =
		await api.badgeExternalIdentifiers.getBadgeExternalIdentifiers.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>
					Badge External Identifiers
				</h1>
				<NewBadgeExternalIdentifierModal />
			</div>
			<BadgeExternalIdentifierList
				badgeExternalIdentifiers={badgeExternalIdentifiers}
			/>
		</main>
	)
}
