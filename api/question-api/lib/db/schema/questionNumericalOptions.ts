import { varchar, integer, real, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questions } from './questions'
import { type getQuestionNumericalOptions } from '@/lib/api/questionNumericalOptions/queries'

import { nanoid } from '@/lib/utils'

export const questionNumericalOptions = pgTable(
	'question_numerical_options',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		questionId: varchar('question_id', { length: 256 })
			.references(() => questions.id, { onDelete: 'cascade' })
			.notNull(),
		showUnits: integer('show_units'),
		unitGradingType: integer('unit_grading_type'),
		unitPenalty: real('unit_penalty'),
		unitsLeft: integer('units_left')
	},
	(questionNumericalOptions) => {
		return {
			questionIdIndex: uniqueIndex('question_id_idx').on(
				questionNumericalOptions.questionId
			)
		}
	}
)

// Schema for questionNumericalOptions - used to validate API requests
const baseSchema = createSelectSchema(questionNumericalOptions)

export const insertQuestionNumericalOptionSchema = createInsertSchema(
	questionNumericalOptions
)
export const insertQuestionNumericalOptionParams = baseSchema
	.extend({
		questionId: z.coerce.string().min(1),
		showUnits: z.coerce.number(),
		unitGradingType: z.coerce.number(),
		unitPenalty: z.coerce.number(),
		unitsLeft: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateQuestionNumericalOptionSchema = baseSchema
export const updateQuestionNumericalOptionParams = baseSchema.extend({
	questionId: z.coerce.string().min(1),
	showUnits: z.coerce.number(),
	unitGradingType: z.coerce.number(),
	unitPenalty: z.coerce.number(),
	unitsLeft: z.coerce.number()
})
export const questionNumericalOptionIdSchema = baseSchema.pick({ id: true })

// Types for questionNumericalOptions - used to type API request params and within Components
export type QuestionNumericalOption =
	typeof questionNumericalOptions.$inferSelect
export type NewQuestionNumericalOption = z.infer<
	typeof insertQuestionNumericalOptionSchema
>
export type NewQuestionNumericalOptionParams = z.infer<
	typeof insertQuestionNumericalOptionParams
>
export type UpdateQuestionNumericalOptionParams = z.infer<
	typeof updateQuestionNumericalOptionParams
>
export type QuestionNumericalOptionId = z.infer<
	typeof questionNumericalOptionIdSchema
>['id']

// this type infers the return from getQuestionNumericalOptions() - meaning it will include any joins
export type CompleteQuestionNumericalOption = Awaited<
	ReturnType<typeof getQuestionNumericalOptions>
>['questionNumericalOptions'][number]
