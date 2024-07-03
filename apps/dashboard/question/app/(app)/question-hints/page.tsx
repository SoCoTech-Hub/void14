import QuestionHintList from '@/components/questionHints/QuestionHintList'
import NewQuestionHintModal from '@/components/questionHints/QuestionHintModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionHints() {
	const { questionHints } = await api.questionHints.getQuestionHints.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Question Hints</h1>
				<NewQuestionHintModal />
			</div>
			<QuestionHintList questionHints={questionHints} />
		</main>
	)
}
