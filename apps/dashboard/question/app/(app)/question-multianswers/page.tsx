import QuestionMultianswerList from '@/components/questionMultianswers/QuestionMultianswerList'
import NewQuestionMultianswerModal from '@/components/questionMultianswers/QuestionMultianswerModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionMultianswers() {
	const { questionMultianswers } =
		await api.questionMultianswers.getQuestionMultianswers.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Question Multianswers</h1>
				<NewQuestionMultianswerModal />
			</div>
			<QuestionMultianswerList questionMultianswers={questionMultianswers} />
		</main>
	)
}
