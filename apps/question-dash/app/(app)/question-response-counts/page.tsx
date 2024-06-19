import QuestionResponseCountList from '@/components/questionResponseCounts/QuestionResponseCountList'
import NewQuestionResponseCountModal from '@/components/questionResponseCounts/QuestionResponseCountModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionResponseCounts() {
	const { questionResponseCounts } =
		await api.questionResponseCounts.getQuestionResponseCounts.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>
					Question Response Counts
				</h1>
				<NewQuestionResponseCountModal />
			</div>
			<QuestionResponseCountList
				questionResponseCounts={questionResponseCounts}
			/>
		</main>
	)
}
