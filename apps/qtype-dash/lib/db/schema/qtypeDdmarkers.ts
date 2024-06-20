import { text, integer, varchar, boolean, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getQtypeDdmarkers } from '@/lib/api/qtypeDdmarkers/queries'

import { nanoid } from '@/lib/utils'

export const qtypeDdmarkers = pgTable(
	'qtype_ddmarkers',
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
		questionId: varchar('question_id', { length: 256 }).notNull(),
		showMisplaced: boolean('show_misplaced').notNull(),
		showNumCorrect: boolean('show_num_correct').notNull(),
		shuffleAnswers: boolean('shuffle_answers').notNull()
	},
	(qtypeDdmarkers) => {
		return {
			questionIdIndex: uniqueIndex('question_id_idx').on(
				qtypeDdmarkers.questionId
			)
		}
	}
)

// Schema for qtypeDdmarkers - used to validate API requests
const baseSchema = createSelectSchema(qtypeDdmarkers)

export const insertQtypeDdmarkerSchema = createInsertSchema(qtypeDdmarkers)
export const insertQtypeDdmarkerParams = baseSchema
	.extend({
		correctFeedbackFormat: z.coerce.number(),
		incorrectFeedbackFormat: z.coerce.number(),
		partiallyCorrectFeedbackFormat: z.coerce.number(),
		showMisplaced: z.coerce.boolean(),
		showNumCorrect: z.coerce.boolean(),
		shuffleAnswers: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateQtypeDdmarkerSchema = baseSchema
export const updateQtypeDdmarkerParams = baseSchema.extend({
	correctFeedbackFormat: z.coerce.number(),
	incorrectFeedbackFormat: z.coerce.number(),
	partiallyCorrectFeedbackFormat: z.coerce.number(),
	showMisplaced: z.coerce.boolean(),
	showNumCorrect: z.coerce.boolean(),
	shuffleAnswers: z.coerce.boolean()
})
export const qtypeDdmarkerIdSchema = baseSchema.pick({ id: true })

// Types for qtypeDdmarkers - used to type API request params and within Components
export type QtypeDdmarker = typeof qtypeDdmarkers.$inferSelect
export type NewQtypeDdmarker = z.infer<typeof insertQtypeDdmarkerSchema>
export type NewQtypeDdmarkerParams = z.infer<typeof insertQtypeDdmarkerParams>
export type UpdateQtypeDdmarkerParams = z.infer<
	typeof updateQtypeDdmarkerParams
>
export type QtypeDdmarkerId = z.infer<typeof qtypeDdmarkerIdSchema>['id']

// this type infers the return from getQtypeDdmarkers() - meaning it will include any joins
export type CompleteQtypeDdmarker = Awaited<
	ReturnType<typeof getQtypeDdmarkers>
>['qtypeDdmarkers'][number]
