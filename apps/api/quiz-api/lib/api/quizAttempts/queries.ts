import { db } from '@/lib/db/index'
import { eq, and } from 'drizzle-orm'
import { getUserAuth } from '@soco/auth/utils'
import {
	type QuizAttemptId,
	quizAttemptIdSchema,
	quizAttempts
} from '@/lib/db/schema/quizAttempts'
import { quizes } from '@/lib/db/schema/quizes'

export const getQuizAttempts = async () => {
	const { session } = await getUserAuth()
	const rows = await db
		.select({ quizAttempt: quizAttempts, quize: quizes })
		.from(quizAttempts)
		.leftJoin(quizes, eq(quizAttempts.quizId, quizes.id))
		.where(eq(quizAttempts.userId, session?.user.id!))
	const q = rows.map((r) => ({ ...r.quizAttempt, quize: r.quize }))
	return { quizAttempts: q }
}

export const getQuizAttemptById = async (id: QuizAttemptId) => {
	const { session } = await getUserAuth()
	const { id: quizAttemptId } = quizAttemptIdSchema.parse({ id })
	const [row] = await db
		.select({ quizAttempt: quizAttempts, quize: quizes })
		.from(quizAttempts)
		.where(
			and(
				eq(quizAttempts.id, quizAttemptId),
				eq(quizAttempts.userId, session?.user.id!)
			)
		)
		.leftJoin(quizes, eq(quizAttempts.quizId, quizes.id))
	if (row === undefined) return {}
	const q = { ...row.quizAttempt, quize: row.quize }
	return { quizAttempt: q }
}
