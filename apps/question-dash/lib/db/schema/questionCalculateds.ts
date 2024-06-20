import { varchar, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questionAnswers } from './questionAnswers'
import { questions } from './questions'
import { type getQuestionCalculateds } from '@/lib/api/questionCalculateds/queries'

import { nanoid } from '@/lib/utils'

export const questionCalculateds = pgTable(
	'question_calculateds',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		questionAnswerId: varchar('question_answer_id', { length: 256 })
			.references(() => questionAnswers.id, { onDelete: 'cascade' })
			.notNull(),
		correctAnswerFormat: integer('correct_answer_format'),
		correctAnswerLength: integer('correct_answer_length'),
		questionId: varchar('question_id', { length: 256 })
			.references(() => questions.id, { onDelete: 'cascade' })
			.notNull(),
		tolerance: varchar('tolerance', { length: 256 }).notNull(),
		toleranceType: integer('tolerance_type')
	},
	(questionCalculateds) => {
		return {
			questionIdIndex: uniqueIndex('question_id_idx').on(
				questionCalculateds.questionId
			)
		}
	}
)

// Schema for questionCalculateds - used to validate API requests
const baseSchema = createSelectSchema(questionCalculateds)

export const insertQuestionCalculatedSchema =
	createInsertSchema(questionCalculateds)
export const insertQuestionCalculatedParams = baseSchema
	.extend({
		questionAnswerId: z.coerce.string().min(1),
		correctAnswerFormat: z.coerce.number(),
		correctAnswerLength: z.coerce.number(),
		questionId: z.coerce.string().min(1),
		toleranceType: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateQuestionCalculatedSchema = baseSchema
export const updateQuestionCalculatedParams = baseSchema.extend({
	questionAnswerId: z.coerce.string().min(1),
	correctAnswerFormat: z.coerce.number(),
	correctAnswerLength: z.coerce.number(),
	questionId: z.coerce.string().min(1),
	toleranceType: z.coerce.number()
})
export const questionCalculatedIdSchema = baseSchema.pick({ id: true })

// Types for questionCalculateds - used to type API request params and within Components
export type QuestionCalculated = typeof questionCalculateds.$inferSelect
export type NewQuestionCalculated = z.infer<
	typeof insertQuestionCalculatedSchema
>
export type NewQuestionCalculatedParams = z.infer<
	typeof insertQuestionCalculatedParams
>
export type UpdateQuestionCalculatedParams = z.infer<
	typeof updateQuestionCalculatedParams
>
export type QuestionCalculatedId = z.infer<
	typeof questionCalculatedIdSchema
>['id']

// this type infers the return from getQuestionCalculateds() - meaning it will include any joins
export type CompleteQuestionCalculated = Awaited<
	ReturnType<typeof getQuestionCalculateds>
>['questionCalculateds'][number]
