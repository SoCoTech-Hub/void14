import BadgeCriteriaParamList from '@/components/badgeCriteriaParams/BadgeCriteriaParamList'
import NewBadgeCriteriaParamModal from '@/components/badgeCriteriaParams/BadgeCriteriaParamModal'
import { api } from '@/lib/trpc/api'

export const dynamic = 'force-dynamic'

export default async function BadgeCriteriaParams() {
	const { badgeCriteriaParams } =
		await api.badgeCriteriaParams.getBadgeCriteriaParams.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Badge Criteria Params</h1>
				<NewBadgeCriteriaParamModal />
			</div>
			<BadgeCriteriaParamList badgeCriteriaParams={badgeCriteriaParams} />
		</main>
	)
}
