import { text, integer, varchar, real, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getWorkshopFormRubricLevels } from '@/lib/api/workshopFormRubricLevels/queries'

import { nanoid } from '@/lib/utils'

export const workshopFormRubricLevels = pgTable(
	'workshop_form_rubric_levels',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		definition: text('definition'),
		definitionFormat: integer('definition_format'),
		dimensionId: varchar('dimension_id', { length: 256 }),
		grade: real('grade')
	},
	(workshopFormRubricLevels) => {
		return {
			dimensionIdIndex: uniqueIndex('dimension_id_idx').on(
				workshopFormRubricLevels.dimensionId
			)
		}
	}
)

// Schema for workshopFormRubricLevels - used to validate API requests
const baseSchema = createSelectSchema(workshopFormRubricLevels)

export const insertWorkshopFormRubricLevelSchema = createInsertSchema(
	workshopFormRubricLevels
)
export const insertWorkshopFormRubricLevelParams = baseSchema
	.extend({
		definitionFormat: z.coerce.number(),
		grade: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateWorkshopFormRubricLevelSchema = baseSchema
export const updateWorkshopFormRubricLevelParams = baseSchema.extend({
	definitionFormat: z.coerce.number(),
	grade: z.coerce.number()
})
export const workshopFormRubricLevelIdSchema = baseSchema.pick({ id: true })

// Types for workshopFormRubricLevels - used to type API request params and within Components
export type WorkshopFormRubricLevel =
	typeof workshopFormRubricLevels.$inferSelect
export type NewWorkshopFormRubricLevel = z.infer<
	typeof insertWorkshopFormRubricLevelSchema
>
export type NewWorkshopFormRubricLevelParams = z.infer<
	typeof insertWorkshopFormRubricLevelParams
>
export type UpdateWorkshopFormRubricLevelParams = z.infer<
	typeof updateWorkshopFormRubricLevelParams
>
export type WorkshopFormRubricLevelId = z.infer<
	typeof workshopFormRubricLevelIdSchema
>['id']

// this type infers the return from getWorkshopFormRubricLevels() - meaning it will include any joins
export type CompleteWorkshopFormRubricLevel = Awaited<
	ReturnType<typeof getWorkshopFormRubricLevels>
>['workshopFormRubricLevels'][number]
