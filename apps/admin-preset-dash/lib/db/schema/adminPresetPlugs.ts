import { varchar, boolean, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { adminPresets } from './adminPresets'
import { type getAdminPresetPlugs } from '@/lib/api/adminPresetPlugs/queries'

import { nanoid } from '@/lib/utils'

export const adminPresetPlugs = pgTable(
	'admin_preset_plugs',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		adminPresetId: varchar('admin_preset_id', { length: 256 })
			.references(() => adminPresets.id)
			.notNull(),
		name: varchar('name', { length: 256 }),
		plugin: varchar('plugin', { length: 256 }),
		isEnabled: boolean('is_enabled')
	},
	(adminPresetPlugs) => {
		return {
			adminPresetIdIndex: uniqueIndex('admin_preset_id_idx').on(
				adminPresetPlugs.adminPresetId
			)
		}
	}
)

// Schema for adminPresetPlugs - used to validate API requests
const baseSchema = createSelectSchema(adminPresetPlugs)

export const insertAdminPresetPlugSchema = createInsertSchema(adminPresetPlugs)
export const insertAdminPresetPlugParams = baseSchema
	.extend({
		adminPresetId: z.coerce.string().min(1),
		isEnabled: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateAdminPresetPlugSchema = baseSchema
export const updateAdminPresetPlugParams = baseSchema.extend({
	adminPresetId: z.coerce.string().min(1),
	isEnabled: z.coerce.boolean()
})
export const adminPresetPlugIdSchema = baseSchema.pick({ id: true })

// Types for adminPresetPlugs - used to type API request params and within Components
export type AdminPresetPlug = typeof adminPresetPlugs.$inferSelect
export type NewAdminPresetPlug = z.infer<typeof insertAdminPresetPlugSchema>
export type NewAdminPresetPlugParams = z.infer<
	typeof insertAdminPresetPlugParams
>
export type UpdateAdminPresetPlugParams = z.infer<
	typeof updateAdminPresetPlugParams
>
export type AdminPresetPlugId = z.infer<typeof adminPresetPlugIdSchema>['id']

// this type infers the return from getAdminPresetPlugs() - meaning it will include any joins
export type CompleteAdminPresetPlug = Awaited<
	ReturnType<typeof getAdminPresetPlugs>
>['adminPresetPlugs'][number]
