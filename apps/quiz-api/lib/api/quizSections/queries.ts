import { db } from '@/lib/db/index'
import { eq } from 'drizzle-orm'
import {
	type QuizSectionId,
	quizSectionIdSchema,
	quizSections
} from '@/lib/db/schema/quizSections'
import { quizes } from '@/lib/db/schema/quizes'

export const getQuizSections = async () => {
	const rows = await db
		.select({ quizSection: quizSections, quize: quizes })
		.from(quizSections)
		.leftJoin(quizes, eq(quizSections.quizId, quizes.id))
	const q = rows.map((r) => ({ ...r.quizSection, quize: r.quize }))
	return { quizSections: q }
}

export const getQuizSectionById = async (id: QuizSectionId) => {
	const { id: quizSectionId } = quizSectionIdSchema.parse({ id })
	const [row] = await db
		.select({ quizSection: quizSections, quize: quizes })
		.from(quizSections)
		.where(eq(quizSections.id, quizSectionId))
		.leftJoin(quizes, eq(quizSections.quizId, quizes.id))
	if (row === undefined) return {}
	const q = { ...row.quizSection, quize: row.quize }
	return { quizSection: q }
}
