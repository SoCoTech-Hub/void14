import { varchar, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { adminPresetsApps } from './adminPresetsApps'
import { type getAdminpresetsAppIts } from '@/lib/api/adminpresetsAppIts/queries'

import { nanoid } from '@/lib/utils'

export const adminpresetsAppIts = pgTable(
	'adminpresets_app_its',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		adminPresetsAppId: varchar('admin_presets_app_id', { length: 256 })
			.references(() => adminPresetsApps.id)
			.notNull(),
		configLogId: varchar('config_log_id', { length: 256 })
	},
	(adminpresetsAppIts) => {
		return {
			adminPresetsAppIdIndex: uniqueIndex('admin_presets_app_id_idx').on(
				adminpresetsAppIts.adminPresetsAppId
			)
		}
	}
)

// Schema for adminpresetsAppIts - used to validate API requests
const baseSchema = createSelectSchema(adminpresetsAppIts)

export const insertAdminpresetsAppItSchema =
	createInsertSchema(adminpresetsAppIts)
export const insertAdminpresetsAppItParams = baseSchema
	.extend({
		adminPresetsAppId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateAdminpresetsAppItSchema = baseSchema
export const updateAdminpresetsAppItParams = baseSchema.extend({
	adminPresetsAppId: z.coerce.string().min(1)
})
export const adminpresetsAppItIdSchema = baseSchema.pick({ id: true })

// Types for adminpresetsAppIts - used to type API request params and within Components
export type AdminpresetsAppIt = typeof adminpresetsAppIts.$inferSelect
export type NewAdminpresetsAppIt = z.infer<typeof insertAdminpresetsAppItSchema>
export type NewAdminpresetsAppItParams = z.infer<
	typeof insertAdminpresetsAppItParams
>
export type UpdateAdminpresetsAppItParams = z.infer<
	typeof updateAdminpresetsAppItParams
>
export type AdminpresetsAppItId = z.infer<
	typeof adminpresetsAppItIdSchema
>['id']

// this type infers the return from getAdminpresetsAppIts() - meaning it will include any joins
export type CompleteAdminpresetsAppIt = Awaited<
	ReturnType<typeof getAdminpresetsAppIts>
>['adminpresetsAppIts'][number]
