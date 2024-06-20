import { varchar, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { questionCategories } from './questionCategories'
import { type getQuestionDatasetDefinitions } from '@/lib/api/questionDatasetDefinitions/queries'

import { nanoid } from '@/lib/utils'

export const questionDatasetDefinitions = pgTable(
	'question_dataset_definitions',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		questionCategoryId: varchar('question_category_id', { length: 256 })
			.references(() => questionCategories.id)
			.notNull(),
		itemCount: integer('item_count').notNull(),
		name: varchar('name', { length: 256 }).notNull(),
		options: varchar('options', { length: 256 }),
		type: integer('type').notNull()
	},
	(questionDatasetDefinitions) => {
		return {
			questionCategoryIdIndex: uniqueIndex('question_category_id_idx').on(
				questionDatasetDefinitions.questionCategoryId
			)
		}
	}
)

// Schema for questionDatasetDefinitions - used to validate API requests
const baseSchema = createSelectSchema(questionDatasetDefinitions)

export const insertQuestionDatasetDefinitionSchema = createInsertSchema(
	questionDatasetDefinitions
)
export const insertQuestionDatasetDefinitionParams = baseSchema
	.extend({
		questionCategoryId: z.coerce.string().min(1),
		itemCount: z.coerce.number(),
		type: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateQuestionDatasetDefinitionSchema = baseSchema
export const updateQuestionDatasetDefinitionParams = baseSchema.extend({
	questionCategoryId: z.coerce.string().min(1),
	itemCount: z.coerce.number(),
	type: z.coerce.number()
})
export const questionDatasetDefinitionIdSchema = baseSchema.pick({ id: true })

// Types for questionDatasetDefinitions - used to type API request params and within Components
export type QuestionDatasetDefinition =
	typeof questionDatasetDefinitions.$inferSelect
export type NewQuestionDatasetDefinition = z.infer<
	typeof insertQuestionDatasetDefinitionSchema
>
export type NewQuestionDatasetDefinitionParams = z.infer<
	typeof insertQuestionDatasetDefinitionParams
>
export type UpdateQuestionDatasetDefinitionParams = z.infer<
	typeof updateQuestionDatasetDefinitionParams
>
export type QuestionDatasetDefinitionId = z.infer<
	typeof questionDatasetDefinitionIdSchema
>['id']

// this type infers the return from getQuestionDatasetDefinitions() - meaning it will include any joins
export type CompleteQuestionDatasetDefinition = Awaited<
	ReturnType<typeof getQuestionDatasetDefinitions>
>['questionDatasetDefinitions'][number]
