import QuestionNumericalOptionList from '@/components/questionNumericalOptions/QuestionNumericalOptionList'
import NewQuestionNumericalOptionModal from '@/components/questionNumericalOptions/QuestionNumericalOptionModal'
import { api } from '@/lib/trpc/api'

export default async function QuestionNumericalOptions() {
	const { questionNumericalOptions } =
		await api.questionNumericalOptions.getQuestionNumericalOptions.query()

	return (
		<main>
			<div className='flex justify-between'>
				<h1 className='font-semibold text-2xl my-2'>
					Question Numerical Options
				</h1>
				<NewQuestionNumericalOptionModal />
			</div>
			<QuestionNumericalOptionList
				questionNumericalOptions={questionNumericalOptions}
			/>
		</main>
	)
}
