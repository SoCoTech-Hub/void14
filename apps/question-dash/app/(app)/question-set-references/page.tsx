import QuestionSetReferenceList from '@/components/questionSetReferences/QuestionSetReferenceList'
import NewQuestionSetReferenceModal from '@/components/questionSetReferences/QuestionSetReferenceModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionSetReferences() {
	const { questionSetReferences } =
		await api.questionSetReferences.getQuestionSetReferences.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Question Set References</h1>
				<NewQuestionSetReferenceModal />
			</div>
			<QuestionSetReferenceList questionSetReferences={questionSetReferences} />
		</main>
	)
}
