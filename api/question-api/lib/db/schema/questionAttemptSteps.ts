import { sql } from 'drizzle-orm'
import {
	real,
	varchar,
	integer,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questionAttempts } from './questionAttempts'
import { type getQuestionAttemptSteps } from '@/lib/api/questionAttemptSteps/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const questionAttemptSteps = pgTable(
	'question_attempt_steps',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		fraction: real('fraction'),
		questionAttemptId: varchar('question_attempt_id', { length: 256 })
			.references(() => questionAttempts.id, { onDelete: 'cascade' })
			.notNull(),
		sequenceNumber: integer('sequence_number'),
		state: varchar('state', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(questionAttemptSteps) => {
		return {
			questionAttemptIdIndex: uniqueIndex(
				'question_attempt_steps_question_attempt_id_idx'
			).on(questionAttemptSteps.questionAttemptId)
		}
	}
)

// Schema for questionAttemptSteps - used to validate API requests
const baseSchema = createSelectSchema(questionAttemptSteps).omit(timestamps)

export const insertQuestionAttemptStepSchema =
	createInsertSchema(questionAttemptSteps).omit(timestamps)
export const insertQuestionAttemptStepParams = baseSchema
	.extend({
		fraction: z.coerce.number(),
		questionAttemptId: z.coerce.string().min(1),
		sequenceNumber: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateQuestionAttemptStepSchema = baseSchema
export const updateQuestionAttemptStepParams = baseSchema
	.extend({
		fraction: z.coerce.number(),
		questionAttemptId: z.coerce.string().min(1),
		sequenceNumber: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const questionAttemptStepIdSchema = baseSchema.pick({ id: true })

// Types for questionAttemptSteps - used to type API request params and within Components
export type QuestionAttemptStep = typeof questionAttemptSteps.$inferSelect
export type NewQuestionAttemptStep = z.infer<
	typeof insertQuestionAttemptStepSchema
>
export type NewQuestionAttemptStepParams = z.infer<
	typeof insertQuestionAttemptStepParams
>
export type UpdateQuestionAttemptStepParams = z.infer<
	typeof updateQuestionAttemptStepParams
>
export type QuestionAttemptStepId = z.infer<
	typeof questionAttemptStepIdSchema
>['id']

// this type infers the return from getQuestionAttemptSteps() - meaning it will include any joins
export type CompleteQuestionAttemptStep = Awaited<
	ReturnType<typeof getQuestionAttemptSteps>
>['questionAttemptSteps'][number]
