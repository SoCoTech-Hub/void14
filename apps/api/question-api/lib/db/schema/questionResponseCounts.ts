import { varchar, integer, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questionResponseAnalysises } from './questionResponseAnalysises'
import { type getQuestionResponseCounts } from '@/lib/api/questionResponseCounts/queries'

import { nanoid } from '@/lib/utils'

export const questionResponseCounts = pgTable(
	'question_response_counts',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		questionResponseAnalysiseId: varchar('question_response_analysise_id', {
			length: 256
		})
			.references(() => questionResponseAnalysises.id)
			.notNull(),
		rcount: integer('rcount').notNull(),
		try: integer('try').notNull()
	},
	(questionResponseCounts) => {
		return {
			questionResponseAnalysiseIdIndex: uniqueIndex(
				'question_response_counts_question_response_analysise_id_idx'
			).on(questionResponseCounts.questionResponseAnalysiseId)
		}
	}
)

// Schema for questionResponseCounts - used to validate API requests
const baseSchema = createSelectSchema(questionResponseCounts)

export const insertQuestionResponseCountSchema = createInsertSchema(
	questionResponseCounts
)
export const insertQuestionResponseCountParams = baseSchema
	.extend({
		questionResponseAnalysiseId: z.coerce.string().min(1),
		rcount: z.coerce.number(),
		try: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateQuestionResponseCountSchema = baseSchema
export const updateQuestionResponseCountParams = baseSchema.extend({
	questionResponseAnalysiseId: z.coerce.string().min(1),
	rcount: z.coerce.number(),
	try: z.coerce.number()
})
export const questionResponseCountIdSchema = baseSchema.pick({ id: true })

// Types for questionResponseCounts - used to type API request params and within Components
export type QuestionResponseCount = typeof questionResponseCounts.$inferSelect
export type NewQuestionResponseCount = z.infer<
	typeof insertQuestionResponseCountSchema
>
export type NewQuestionResponseCountParams = z.infer<
	typeof insertQuestionResponseCountParams
>
export type UpdateQuestionResponseCountParams = z.infer<
	typeof updateQuestionResponseCountParams
>
export type QuestionResponseCountId = z.infer<
	typeof questionResponseCountIdSchema
>['id']

// this type infers the return from getQuestionResponseCounts() - meaning it will include any joins
export type CompleteQuestionResponseCount = Awaited<
	ReturnType<typeof getQuestionResponseCounts>
>['questionResponseCounts'][number]
