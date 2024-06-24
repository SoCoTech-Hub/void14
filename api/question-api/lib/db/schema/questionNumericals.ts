import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questionAnswers } from './questionAnswers'
import { questions } from './questions'
import { type getQuestionNumericals } from '@/lib/api/questionNumericals/queries'

import { nanoid } from '@/lib/utils'

export const questionNumericals = pgTable(
	'question_numericals',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		questionAnswerId: varchar('question_answer_id', { length: 256 })
			.references(() => questionAnswers.id)
			.notNull(),
		questionId: varchar('question_id', { length: 256 })
			.references(() => questions.id, { onDelete: 'cascade' })
			.notNull(),
		tolerance: varchar('tolerance', { length: 256 }).notNull()
	},
	(questionNumericals) => {
		return {
			questionIdIndex: uniqueIndex('question_id_idx').on(
				questionNumericals.questionId
			)
		}
	}
)

// Schema for questionNumericals - used to validate API requests
const baseSchema = createSelectSchema(questionNumericals)

export const insertQuestionNumericalSchema =
	createInsertSchema(questionNumericals)
export const insertQuestionNumericalParams = baseSchema
	.extend({
		questionAnswerId: z.coerce.string().min(1),
		questionId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateQuestionNumericalSchema = baseSchema
export const updateQuestionNumericalParams = baseSchema.extend({
	questionAnswerId: z.coerce.string().min(1),
	questionId: z.coerce.string().min(1)
})
export const questionNumericalIdSchema = baseSchema.pick({ id: true })

// Types for questionNumericals - used to type API request params and within Components
export type QuestionNumerical = typeof questionNumericals.$inferSelect
export type NewQuestionNumerical = z.infer<typeof insertQuestionNumericalSchema>
export type NewQuestionNumericalParams = z.infer<
	typeof insertQuestionNumericalParams
>
export type UpdateQuestionNumericalParams = z.infer<
	typeof updateQuestionNumericalParams
>
export type QuestionNumericalId = z.infer<
	typeof questionNumericalIdSchema
>['id']

// this type infers the return from getQuestionNumericals() - meaning it will include any joins
export type CompleteQuestionNumerical = Awaited<
	ReturnType<typeof getQuestionNumericals>
>['questionNumericals'][number]
