import { sql } from 'drizzle-orm'
import {
	real,
	varchar,
	boolean,
	text,
	integer,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questions } from './questions'
import { type getQuestionStatistics } from '@/lib/api/questionStatistics/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const questionStatistics = pgTable(
	'question_statistics',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		discriminationIndex: real('discrimination_index'),
		discriminativeEfficiency: real('discriminative_efficiency'),
		effectiveWeight: real('effective_weight'),
		facility: real('facility'),
		hashcode: varchar('hashcode', { length: 256 }),
		maxMark: real('max_mark'),
		negCovar: boolean('neg_covar'),
		positions: text('positions'),
		questionId: varchar('question_id', { length: 256 })
			.references(() => questions.id, { onDelete: 'cascade' })
			.notNull(),
		randomGuessScore: real('random_guess_score'),
		s: integer('s'),
		sd: real('sd'),
		slot: integer('slot'),
		subQuestion: boolean('sub_question'),
		subQuestions: text('sub_questions'),
		variant: integer('variant'),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(questionStatistics) => {
		return {
			questionIdIndex: uniqueIndex('question_statistics_question_id_idx').on(
				questionStatistics.questionId
			)
		}
	}
)

// Schema for questionStatistics - used to validate API requests
const baseSchema = createSelectSchema(questionStatistics).omit(timestamps)

export const insertQuestionStatisticSchema =
	createInsertSchema(questionStatistics).omit(timestamps)
export const insertQuestionStatisticParams = baseSchema
	.extend({
		discriminationIndex: z.coerce.number(),
		discriminativeEfficiency: z.coerce.number(),
		effectiveWeight: z.coerce.number(),
		facility: z.coerce.number(),
		maxMark: z.coerce.number(),
		negCovar: z.coerce.boolean(),
		questionId: z.coerce.string().min(1),
		randomGuessScore: z.coerce.number(),
		s: z.coerce.number(),
		sd: z.coerce.number(),
		slot: z.coerce.number(),
		subQuestion: z.coerce.boolean(),
		variant: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateQuestionStatisticSchema = baseSchema
export const updateQuestionStatisticParams = baseSchema.extend({
	discriminationIndex: z.coerce.number(),
	discriminativeEfficiency: z.coerce.number(),
	effectiveWeight: z.coerce.number(),
	facility: z.coerce.number(),
	maxMark: z.coerce.number(),
	negCovar: z.coerce.boolean(),
	questionId: z.coerce.string().min(1),
	randomGuessScore: z.coerce.number(),
	s: z.coerce.number(),
	sd: z.coerce.number(),
	slot: z.coerce.number(),
	subQuestion: z.coerce.boolean(),
	variant: z.coerce.number()
})
export const questionStatisticIdSchema = baseSchema.pick({ id: true })

// Types for questionStatistics - used to type API request params and within Components
export type QuestionStatistic = typeof questionStatistics.$inferSelect
export type NewQuestionStatistic = z.infer<typeof insertQuestionStatisticSchema>
export type NewQuestionStatisticParams = z.infer<
	typeof insertQuestionStatisticParams
>
export type UpdateQuestionStatisticParams = z.infer<
	typeof updateQuestionStatisticParams
>
export type QuestionStatisticId = z.infer<
	typeof questionStatisticIdSchema
>['id']

// this type infers the return from getQuestionStatistics() - meaning it will include any joins
export type CompleteQuestionStatistic = Awaited<
	ReturnType<typeof getQuestionStatistics>
>['questionStatistics'][number]
