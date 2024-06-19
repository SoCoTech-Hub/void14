import { sql } from 'drizzle-orm'
import { real, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { quizes } from './quizes'
import { type getQuizGrades } from '@/lib/api/quizGrades/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const quizGrades = pgTable(
	'quiz_grades',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		grade: real('grade'),
		quizId: varchar('quiz_id', { length: 256 })
			.references(() => quizes.id, { onDelete: 'cascade' })
			.notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(quizGrades) => {
		return {
			quizIdIndex: uniqueIndex('quiz_id_idx').on(quizGrades.quizId)
		}
	}
)

// Schema for quizGrades - used to validate API requests
const baseSchema = createSelectSchema(quizGrades).omit(timestamps)

export const insertQuizGradeSchema =
	createInsertSchema(quizGrades).omit(timestamps)
export const insertQuizGradeParams = baseSchema
	.extend({
		grade: z.coerce.number(),
		quizId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateQuizGradeSchema = baseSchema
export const updateQuizGradeParams = baseSchema
	.extend({
		grade: z.coerce.number(),
		quizId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const quizGradeIdSchema = baseSchema.pick({ id: true })

// Types for quizGrades - used to type API request params and within Components
export type QuizGrade = typeof quizGrades.$inferSelect
export type NewQuizGrade = z.infer<typeof insertQuizGradeSchema>
export type NewQuizGradeParams = z.infer<typeof insertQuizGradeParams>
export type UpdateQuizGradeParams = z.infer<typeof updateQuizGradeParams>
export type QuizGradeId = z.infer<typeof quizGradeIdSchema>['id']

// this type infers the return from getQuizGrades() - meaning it will include any joins
export type CompleteQuizGrade = Awaited<
	ReturnType<typeof getQuizGrades>
>['quizGrades'][number]
