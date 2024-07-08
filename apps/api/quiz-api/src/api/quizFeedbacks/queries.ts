import { db } from '@soco/quiz-db/index'
import { eq } from 'drizzle-orm'
import {
	type QuizFeedbackId,
	quizFeedbackIdSchema,
	quizFeedbacks
} from '@soco/quiz-db/schema/quizFeedbacks'
import { quizes } from '@soco/quiz-db/schema/quizes'

export const getQuizFeedbacks = async () => {
	const rows = await db
		.select({ quizFeedback: quizFeedbacks, quize: quizes })
		.from(quizFeedbacks)
		.leftJoin(quizes, eq(quizFeedbacks.quizId, quizes.id))
	const q = rows.map((r) => ({ ...r.quizFeedback, quize: r.quize }))
	return { quizFeedbacks: q }
}

export const getQuizFeedbackById = async (id: QuizFeedbackId) => {
	const { id: quizFeedbackId } = quizFeedbackIdSchema.parse({ id })
	const [row] = await db
		.select({ quizFeedback: quizFeedbacks, quize: quizes })
		.from(quizFeedbacks)
		.where(eq(quizFeedbacks.id, quizFeedbackId))
		.leftJoin(quizes, eq(quizFeedbacks.quizId, quizes.id))
	if (row === undefined) return {}
	const q = { ...row.quizFeedback, quize: row.quize }
	return { quizFeedback: q }
}
