import {
	timestamp,
	varchar,
	integer,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { assigns } from './assigns'
import { type getAssignOverrides } from '@/lib/api/assignOverrides/queries'

import { nanoid } from '@/lib/utils'

export const assignOverrides = pgTable(
	'assign_overrides',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		allowSubmissionsFromDate: timestamp('allow_submissions_from_date'),
		assignId: varchar('assign_id', { length: 256 })
			.references(() => assigns.id)
			.notNull(),
		cutOffDate: timestamp('cut_off_date'),
		dueDate: timestamp('due_date'),
		groupId: varchar('group_id', { length: 256 }),
		sortOrder: integer('sort_order'),
		timeLimit: integer('time_limit'),
		userId: varchar('user_id', { length: 256 }).notNull()
	},
	(assignOverrides) => {
		return {
			assignIdIndex: uniqueIndex('ao_assign_id_idx').on(
				assignOverrides.assignId
			)
		}
	}
)

// Schema for assignOverrides - used to validate API requests
const baseSchema = createSelectSchema(assignOverrides)

export const insertAssignOverrideSchema = createInsertSchema(assignOverrides)
export const insertAssignOverrideParams = baseSchema
	.extend({
		allowSubmissionsFromDate: z.coerce.string().min(1),
		assignId: z.coerce.string().min(1),
		cutOffDate: z.coerce.string().min(1),
		dueDate: z.coerce.string().min(1),
		sortOrder: z.coerce.number(),
		timeLimit: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateAssignOverrideSchema = baseSchema
export const updateAssignOverrideParams = baseSchema
	.extend({
		allowSubmissionsFromDate: z.coerce.string().min(1),
		assignId: z.coerce.string().min(1),
		cutOffDate: z.coerce.string().min(1),
		dueDate: z.coerce.string().min(1),
		sortOrder: z.coerce.number(),
		timeLimit: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const assignOverrideIdSchema = baseSchema.pick({ id: true })

// Types for assignOverrides - used to type API request params and within Components
export type AssignOverride = typeof assignOverrides.$inferSelect
export type NewAssignOverride = z.infer<typeof insertAssignOverrideSchema>
export type NewAssignOverrideParams = z.infer<typeof insertAssignOverrideParams>
export type UpdateAssignOverrideParams = z.infer<
	typeof updateAssignOverrideParams
>
export type AssignOverrideId = z.infer<typeof assignOverrideIdSchema>['id']

// this type infers the return from getAssignOverrides() - meaning it will include any joins
export type CompleteAssignOverride = Awaited<
	ReturnType<typeof getAssignOverrides>
>['assignOverrides'][number]
