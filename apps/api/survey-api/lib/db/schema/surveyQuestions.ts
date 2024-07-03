import { varchar, text, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getSurveyQuestions } from '@/lib/api/surveyQuestions/queries'

import { nanoid } from '@/lib/utils'

export const surveyQuestions = pgTable('survey_questions', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	intro: varchar('intro', { length: 256 }),
	multi: varchar('multi', { length: 256 }),
	options: text('options'),
	shortText: varchar('short_text', { length: 256 }),
	text: varchar('text', { length: 256 }),
	type: integer('type')
})

// Schema for surveyQuestions - used to validate API requests
const baseSchema = createSelectSchema(surveyQuestions)

export const insertSurveyQuestionSchema = createInsertSchema(surveyQuestions)
export const insertSurveyQuestionParams = baseSchema
	.extend({
		type: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateSurveyQuestionSchema = baseSchema
export const updateSurveyQuestionParams = baseSchema.extend({
	type: z.coerce.number()
})
export const surveyQuestionIdSchema = baseSchema.pick({ id: true })

// Types for surveyQuestions - used to type API request params and within Components
export type SurveyQuestion = typeof surveyQuestions.$inferSelect
export type NewSurveyQuestion = z.infer<typeof insertSurveyQuestionSchema>
export type NewSurveyQuestionParams = z.infer<typeof insertSurveyQuestionParams>
export type UpdateSurveyQuestionParams = z.infer<
	typeof updateSurveyQuestionParams
>
export type SurveyQuestionId = z.infer<typeof surveyQuestionIdSchema>['id']

// this type infers the return from getSurveyQuestions() - meaning it will include any joins
export type CompleteSurveyQuestion = Awaited<
	ReturnType<typeof getSurveyQuestions>
>['surveyQuestions'][number]
