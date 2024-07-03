import { varchar, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questionBankEntries } from './questionBankEntries'
import { questions } from './questions'
import { type getQuestionVersions } from '@/lib/api/questionVersions/queries'

import { nanoid } from '@/lib/utils'

export const questionVersions = pgTable(
	'question_versions',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		questionBankEntryId: varchar('question_bank_entry_id', { length: 256 })
			.references(() => questionBankEntries.id)
			.notNull(),
		questionId: varchar('question_id', { length: 256 })
			.references(() => questions.id, { onDelete: 'cascade' })
			.notNull(),
		status: varchar('status', { length: 256 }),
		version: integer('version').notNull()
	},
	(questionVersions) => {
		return {
			questionIdIndex: uniqueIndex('question_id_idx').on(
				questionVersions.questionId
			)
		}
	}
)

// Schema for questionVersions - used to validate API requests
const baseSchema = createSelectSchema(questionVersions)

export const insertQuestionVersionSchema = createInsertSchema(questionVersions)
export const insertQuestionVersionParams = baseSchema
	.extend({
		questionBankEntryId: z.coerce.string().min(1),
		questionId: z.coerce.string().min(1),
		version: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateQuestionVersionSchema = baseSchema
export const updateQuestionVersionParams = baseSchema.extend({
	questionBankEntryId: z.coerce.string().min(1),
	questionId: z.coerce.string().min(1),
	version: z.coerce.number()
})
export const questionVersionIdSchema = baseSchema.pick({ id: true })

// Types for questionVersions - used to type API request params and within Components
export type QuestionVersion = typeof questionVersions.$inferSelect
export type NewQuestionVersion = z.infer<typeof insertQuestionVersionSchema>
export type NewQuestionVersionParams = z.infer<
	typeof insertQuestionVersionParams
>
export type UpdateQuestionVersionParams = z.infer<
	typeof updateQuestionVersionParams
>
export type QuestionVersionId = z.infer<typeof questionVersionIdSchema>['id']

// this type infers the return from getQuestionVersions() - meaning it will include any joins
export type CompleteQuestionVersion = Awaited<
	ReturnType<typeof getQuestionVersions>
>['questionVersions'][number]
