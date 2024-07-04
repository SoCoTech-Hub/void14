import { varchar, text, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import type { getAdminPresetItAs } from '@/lib/api/adminPresetItAs/queries'

import { nanoid } from '@soco/utils'

export const adminPresetItAs = pgTable(
	'admin_preset_it_as',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		itemId: varchar('item_id', { length: 256 }),
		name: varchar('name', { length: 256 }),
		value: text('value')
	},
	(adminPresetItAs) => {
		return {
			itemIdIndex: uniqueIndex('item_id_idx').on(adminPresetItAs.itemId)
		}
	}
)

// Schema for adminPresetItAs - used to validate API requests
const baseSchema = createSelectSchema(adminPresetItAs)

export const insertAdminPresetItASchema = createInsertSchema(adminPresetItAs)
export const insertAdminPresetItAParams = baseSchema.extend({}).omit({
	id: true
})

export const updateAdminPresetItASchema = baseSchema
export const updateAdminPresetItAParams = baseSchema.extend({})
export const adminPresetItAIdSchema = baseSchema.pick({ id: true })

// Types for adminPresetItAs - used to type API request params and within Components
export type AdminPresetItA = typeof adminPresetItAs.$inferSelect
export type NewAdminPresetItA = z.infer<typeof insertAdminPresetItASchema>
export type NewAdminPresetItAParams = z.infer<typeof insertAdminPresetItAParams>
export type UpdateAdminPresetItAParams = z.infer<
	typeof updateAdminPresetItAParams
>
export type AdminPresetItAId = z.infer<typeof adminPresetItAIdSchema>['id']

// this type infers the return from getAdminPresetItAs() - meaning it will include any joins
export type CompleteAdminPresetItA = Awaited<
	ReturnType<typeof getAdminPresetItAs>
>['adminPresetItAs'][number]
