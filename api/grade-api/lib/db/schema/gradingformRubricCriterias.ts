import { varchar, text, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getGradingformRubricCriterias } from '@/lib/api/gradingformRubricCriterias/queries'

import { nanoid } from '@/lib/utils'

export const gradingformRubricCriterias = pgTable(
	'gradingform_rubric_criterias',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		definitionId: varchar('definition_id', { length: 256 }),
		description: text('description'),
		descriptionFormat: integer('description_format'),
		sortOrder: integer('sort_order')
	},
	(gradingformRubricCriterias) => {
		return {
			sortOrderIndex: uniqueIndex('sort_order_idx').on(
				gradingformRubricCriterias.sortOrder
			)
		}
	}
)

// Schema for gradingformRubricCriterias - used to validate API requests
const baseSchema = createSelectSchema(gradingformRubricCriterias)

export const insertGradingformRubricCriteriaSchema = createInsertSchema(
	gradingformRubricCriterias
)
export const insertGradingformRubricCriteriaParams = baseSchema
	.extend({
		descriptionFormat: z.coerce.number(),
		sortOrder: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateGradingformRubricCriteriaSchema = baseSchema
export const updateGradingformRubricCriteriaParams = baseSchema.extend({
	descriptionFormat: z.coerce.number(),
	sortOrder: z.coerce.number()
})
export const gradingformRubricCriteriaIdSchema = baseSchema.pick({ id: true })

// Types for gradingformRubricCriterias - used to type API request params and within Components
export type GradingformRubricCriteria =
	typeof gradingformRubricCriterias.$inferSelect
export type NewGradingformRubricCriteria = z.infer<
	typeof insertGradingformRubricCriteriaSchema
>
export type NewGradingformRubricCriteriaParams = z.infer<
	typeof insertGradingformRubricCriteriaParams
>
export type UpdateGradingformRubricCriteriaParams = z.infer<
	typeof updateGradingformRubricCriteriaParams
>
export type GradingformRubricCriteriaId = z.infer<
	typeof gradingformRubricCriteriaIdSchema
>['id']

// this type infers the return from getGradingformRubricCriterias() - meaning it will include any joins
export type CompleteGradingformRubricCriteria = Awaited<
	ReturnType<typeof getGradingformRubricCriterias>
>['gradingformRubricCriterias'][number]
