import {
	text,
	integer,
	real,
	varchar,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questions } from './questions'
import { type getQuestionAnswers } from '@/lib/api/questionAnswers/queries'

import { nanoid } from '@/lib/utils'

export const questionAnswers = pgTable(
	'question_answers',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		answer: text('answer'),
		answerFormat: integer('answer_format'),
		feedback: text('feedback'),
		feedbackFormat: integer('feedback_format'),
		fraction: real('fraction'),
		questionId: varchar('question_id', { length: 256 })
			.references(() => questions.id, { onDelete: 'cascade' })
			.notNull()
	},
	(questionAnswers) => {
		return {
			questionIdIndex: uniqueIndex('question_answers_question_id_idx').on(
				questionAnswers.questionId
			)
		}
	}
)

// Schema for questionAnswers - used to validate API requests
const baseSchema = createSelectSchema(questionAnswers)

export const insertQuestionAnswerSchema = createInsertSchema(questionAnswers)
export const insertQuestionAnswerParams = baseSchema
	.extend({
		answerFormat: z.coerce.number(),
		feedbackFormat: z.coerce.number(),
		fraction: z.coerce.number(),
		questionId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateQuestionAnswerSchema = baseSchema
export const updateQuestionAnswerParams = baseSchema.extend({
	answerFormat: z.coerce.number(),
	feedbackFormat: z.coerce.number(),
	fraction: z.coerce.number(),
	questionId: z.coerce.string().min(1)
})
export const questionAnswerIdSchema = baseSchema.pick({ id: true })

// Types for questionAnswers - used to type API request params and within Components
export type QuestionAnswer = typeof questionAnswers.$inferSelect
export type NewQuestionAnswer = z.infer<typeof insertQuestionAnswerSchema>
export type NewQuestionAnswerParams = z.infer<typeof insertQuestionAnswerParams>
export type UpdateQuestionAnswerParams = z.infer<
	typeof updateQuestionAnswerParams
>
export type QuestionAnswerId = z.infer<typeof questionAnswerIdSchema>['id']

// this type infers the return from getQuestionAnswers() - meaning it will include any joins
export type CompleteQuestionAnswer = Awaited<
	ReturnType<typeof getQuestionAnswers>
>['questionAnswers'][number]
