import QuestionList from '@/components/questions/QuestionList'
import NewQuestionModal from '@/components/questions/QuestionModal'
import { api } from '@/lib/trpc/api'
import { checkAuth } from '@/lib/auth/utils'

export default async function Questions() {
	await checkAuth()
	const { questions } = await api.questions.getQuestions.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Questions</h1>
				<NewQuestionModal />
			</div>
			<QuestionList questions={questions} />
		</main>
	)
}
