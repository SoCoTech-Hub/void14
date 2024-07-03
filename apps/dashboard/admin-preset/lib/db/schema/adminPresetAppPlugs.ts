import { varchar, integer, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { adminPresetsApps } from './adminPresetsApps'
import { type getAdminPresetAppPlugs } from '@/lib/api/adminPresetAppPlugs/queries'

import { nanoid } from '@/lib/utils'

export const adminPresetAppPlugs = pgTable(
	'admin_preset_app_plugs',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		name: varchar('name', { length: 256 }),
		adminPresetsAppId: varchar('admin_presets_app_id', { length: 256 })
			.references(() => adminPresetsApps.id)
			.notNull(),
		oldValue: integer('old_value'),
		value: integer('value'),
		plugin: varchar('plugin', { length: 256 })
	},
	(adminPresetAppPlugs) => {
		return {
			adminPresetsAppIdIndex: uniqueIndex('admin_presets_app_id_idx').on(
				adminPresetAppPlugs.adminPresetsAppId
			)
		}
	}
)

// Schema for adminPresetAppPlugs - used to validate API requests
const baseSchema = createSelectSchema(adminPresetAppPlugs)

export const insertAdminPresetAppPlugSchema =
	createInsertSchema(adminPresetAppPlugs)
export const insertAdminPresetAppPlugParams = baseSchema
	.extend({
		adminPresetsAppId: z.coerce.string().min(1),
		oldValue: z.coerce.number(),
		value: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateAdminPresetAppPlugSchema = baseSchema
export const updateAdminPresetAppPlugParams = baseSchema.extend({
	adminPresetsAppId: z.coerce.string().min(1),
	oldValue: z.coerce.number(),
	value: z.coerce.number()
})
export const adminPresetAppPlugIdSchema = baseSchema.pick({ id: true })

// Types for adminPresetAppPlugs - used to type API request params and within Components
export type AdminPresetAppPlug = typeof adminPresetAppPlugs.$inferSelect
export type NewAdminPresetAppPlug = z.infer<
	typeof insertAdminPresetAppPlugSchema
>
export type NewAdminPresetAppPlugParams = z.infer<
	typeof insertAdminPresetAppPlugParams
>
export type UpdateAdminPresetAppPlugParams = z.infer<
	typeof updateAdminPresetAppPlugParams
>
export type AdminPresetAppPlugId = z.infer<
	typeof adminPresetAppPlugIdSchema
>['id']

// this type infers the return from getAdminPresetAppPlugs() - meaning it will include any joins
export type CompleteAdminPresetAppPlug = Awaited<
	ReturnType<typeof getAdminPresetAppPlugs>
>['adminPresetAppPlugs'][number]
