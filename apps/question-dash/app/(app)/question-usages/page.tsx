import QuestionUsageList from '@/components/questionUsages/QuestionUsageList'
import NewQuestionUsageModal from '@/components/questionUsages/QuestionUsageModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionUsages() {
	const { questionUsages } = await api.questionUsages.getQuestionUsages.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Question Usages</h1>
				<NewQuestionUsageModal />
			</div>
			<QuestionUsageList questionUsages={questionUsages} />
		</main>
	)
}
