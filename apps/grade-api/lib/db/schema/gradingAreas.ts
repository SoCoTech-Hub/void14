import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getGradingAreas } from '@/lib/api/gradingAreas/queries'

import { nanoid } from '@/lib/utils'

export const gradingAreas = pgTable('grading_areas', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	activeMethod: varchar('active_method', { length: 256 }),
	areaName: varchar('area_name', { length: 256 }),
	component: varchar('component', { length: 256 }).notNull(),
	contextId: varchar('context_id', { length: 256 })
})

// Schema for gradingAreas - used to validate API requests
const baseSchema = createSelectSchema(gradingAreas)

export const insertGradingAreaSchema = createInsertSchema(gradingAreas)
export const insertGradingAreaParams = baseSchema.extend({}).omit({
	id: true
})

export const updateGradingAreaSchema = baseSchema
export const updateGradingAreaParams = baseSchema.extend({})
export const gradingAreaIdSchema = baseSchema.pick({ id: true })

// Types for gradingAreas - used to type API request params and within Components
export type GradingArea = typeof gradingAreas.$inferSelect
export type NewGradingArea = z.infer<typeof insertGradingAreaSchema>
export type NewGradingAreaParams = z.infer<typeof insertGradingAreaParams>
export type UpdateGradingAreaParams = z.infer<typeof updateGradingAreaParams>
export type GradingAreaId = z.infer<typeof gradingAreaIdSchema>['id']

// this type infers the return from getGradingAreas() - meaning it will include any joins
export type CompleteGradingArea = Awaited<
	ReturnType<typeof getGradingAreas>
>['gradingAreas'][number]
