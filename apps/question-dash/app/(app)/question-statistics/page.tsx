import QuestionStatisticList from '@/components/questionStatistics/QuestionStatisticList'
import NewQuestionStatisticModal from '@/components/questionStatistics/QuestionStatisticModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionStatistics() {
	const { questionStatistics } =
		await api.questionStatistics.getQuestionStatistics.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Question Statistics</h1>
				<NewQuestionStatisticModal />
			</div>
			<QuestionStatisticList questionStatistics={questionStatistics} />
		</main>
	)
}
