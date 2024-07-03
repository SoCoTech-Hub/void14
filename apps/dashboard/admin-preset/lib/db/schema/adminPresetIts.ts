import { varchar, text, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { adminPresetsApps } from './adminPresetsApps'
import { type getAdminPresetIts } from '@/lib/api/adminPresetIts/queries'

import { nanoid } from '@/lib/utils'

export const adminPresetIts = pgTable(
	'admin_preset_its',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		name: varchar('name', { length: 256 }),
		plugin: varchar('plugin', { length: 256 }),
		value: text('value'),
		adminPresetsAppId: varchar('admin_presets_app_id', { length: 256 })
			.references(() => adminPresetsApps.id)
			.notNull()
	},
	(adminPresetIts) => {
		return {
			adminPresetsAppIdIndex: uniqueIndex('admin_presets_app_id_idx').on(
				adminPresetIts.adminPresetsAppId
			)
		}
	}
)

// Schema for adminPresetIts - used to validate API requests
const baseSchema = createSelectSchema(adminPresetIts)

export const insertAdminPresetItSchema = createInsertSchema(adminPresetIts)
export const insertAdminPresetItParams = baseSchema
	.extend({
		adminPresetsAppId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateAdminPresetItSchema = baseSchema
export const updateAdminPresetItParams = baseSchema.extend({
	adminPresetsAppId: z.coerce.string().min(1)
})
export const adminPresetItIdSchema = baseSchema.pick({ id: true })

// Types for adminPresetIts - used to type API request params and within Components
export type AdminPresetIt = typeof adminPresetIts.$inferSelect
export type NewAdminPresetIt = z.infer<typeof insertAdminPresetItSchema>
export type NewAdminPresetItParams = z.infer<typeof insertAdminPresetItParams>
export type UpdateAdminPresetItParams = z.infer<
	typeof updateAdminPresetItParams
>
export type AdminPresetItId = z.infer<typeof adminPresetItIdSchema>['id']

// this type infers the return from getAdminPresetIts() - meaning it will include any joins
export type CompleteAdminPresetIt = Awaited<
	ReturnType<typeof getAdminPresetIts>
>['adminPresetIts'][number]
