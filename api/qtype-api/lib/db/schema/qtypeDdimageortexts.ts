import {
	text,
	integer,
	boolean,
	varchar,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getQtypeDdimageortexts } from '@/lib/api/qtypeDdimageortexts/queries'

import { nanoid } from '@/lib/utils'

export const qtypeDdimageortexts = pgTable(
	'qtype_ddimageortexts',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		correctFeedback: text('correct_feedback'),
		correctFeedbackFormat: integer('correct_feedback_format'),
		incorrectFeedback: text('incorrect_feedback'),
		incorrectFeedbackFormat: integer('incorrect_feedback_format'),
		partiallyCorrectFeedback: text('partially_correct_feedback'),
		partiallyCorrectFeedbackFormat: integer(
			'partially_correct_feedback_format'
		),
		showNumCorrect: boolean('show_num_correct').notNull(),
		shuffleAnswers: boolean('shuffle_answers').notNull(),
		questionId: varchar('question_id', { length: 256 }).notNull()
	},
	(qtypeDdimageortexts) => {
		return {
			questionIdIndex: uniqueIndex('qtype_ddimageortexts_question_id_idx').on(
				qtypeDdimageortexts.questionId
			)
		}
	}
)

// Schema for qtypeDdimageortexts - used to validate API requests
const baseSchema = createSelectSchema(qtypeDdimageortexts)

export const insertQtypeDdimageortextSchema =
	createInsertSchema(qtypeDdimageortexts)
export const insertQtypeDdimageortextParams = baseSchema
	.extend({
		correctFeedbackFormat: z.coerce.number(),
		incorrectFeedbackFormat: z.coerce.number(),
		partiallyCorrectFeedbackFormat: z.coerce.number(),
		showNumCorrect: z.coerce.boolean(),
		shuffleAnswers: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateQtypeDdimageortextSchema = baseSchema
export const updateQtypeDdimageortextParams = baseSchema.extend({
	correctFeedbackFormat: z.coerce.number(),
	incorrectFeedbackFormat: z.coerce.number(),
	partiallyCorrectFeedbackFormat: z.coerce.number(),
	showNumCorrect: z.coerce.boolean(),
	shuffleAnswers: z.coerce.boolean()
})
export const qtypeDdimageortextIdSchema = baseSchema.pick({ id: true })

// Types for qtypeDdimageortexts - used to type API request params and within Components
export type QtypeDdimageortext = typeof qtypeDdimageortexts.$inferSelect
export type NewQtypeDdimageortext = z.infer<
	typeof insertQtypeDdimageortextSchema
>
export type NewQtypeDdimageortextParams = z.infer<
	typeof insertQtypeDdimageortextParams
>
export type UpdateQtypeDdimageortextParams = z.infer<
	typeof updateQtypeDdimageortextParams
>
export type QtypeDdimageortextId = z.infer<
	typeof qtypeDdimageortextIdSchema
>['id']

// this type infers the return from getQtypeDdimageortexts() - meaning it will include any joins
export type CompleteQtypeDdimageortext = Awaited<
	ReturnType<typeof getQtypeDdimageortexts>
>['qtypeDdimageortexts'][number]
