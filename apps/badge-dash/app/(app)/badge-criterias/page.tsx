import BadgeCriteriaList from '@/components/badgeCriterias/BadgeCriteriaList'
import NewBadgeCriteriaModal from '@/components/badgeCriterias/BadgeCriteriaModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeCriterias() {
	const { badgeCriterias } = await api.badgeCriterias.getBadgeCriterias.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Criterias</h1>
				<NewBadgeCriteriaModal />
			</div>
			<BadgeCriteriaList badgeCriterias={badgeCriterias} />
		</main>
	)
}
