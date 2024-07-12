import { db } from '@soco/quiz-db/client'
import { eq, and } from '@soco/quiz-db'
import { getUserAuth } from '@soco/auth-service'
import {
	type QuizOverrideId,
	quizOverrideIdSchema,
	quizOverrides
} from '@soco/quiz-db/schema/quizOverrides'
import { quizes } from '@soco/quiz-db/schema/quizes'

export const getQuizOverrides = async () => {
	const { session } = await getUserAuth()
	const rows = await db
		.select({ quizOverride: quizOverrides, quize: quizes })
		.from(quizOverrides)
		.leftJoin(quizes, eq(quizOverrides.quizId, quizes.id))
		.where(eq(quizOverrides.userId, session?.user.id!))
	const q = rows.map((r) => ({ ...r.quizOverride, quize: r.quize }))
	return { quizOverrides: q }
}

export const getQuizOverrideById = async (id: QuizOverrideId) => {
	const { session } = await getUserAuth()
	const { id: quizOverrideId } = quizOverrideIdSchema.parse({ id })
	const [row] = await db
		.select({ quizOverride: quizOverrides, quize: quizes })
		.from(quizOverrides)
		.where(
			and(
				eq(quizOverrides.id, quizOverrideId),
				eq(quizOverrides.userId, session?.user.id!)
			)
		)
		.leftJoin(quizes, eq(quizOverrides.quizId, quizes.id))
	if (row === undefined) return {}
	const q = { ...row.quizOverride, quize: row.quize }
	return { quizOverride: q }
}
