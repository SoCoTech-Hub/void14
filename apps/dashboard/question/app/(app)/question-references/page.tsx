import QuestionReferenceList from '@/components/questionReferences/QuestionReferenceList'
import NewQuestionReferenceModal from '@/components/questionReferences/QuestionReferenceModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionReferences() {
	const { questionReferences } =
		await api.questionReferences.getQuestionReferences.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>Question References</h1>
				<NewQuestionReferenceModal />
			</div>
			<QuestionReferenceList questionReferences={questionReferences} />
		</main>
	)
}
