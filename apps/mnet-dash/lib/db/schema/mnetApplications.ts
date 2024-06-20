import { varchar, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getMnetApplications } from '@/lib/api/mnetApplications/queries'

import { nanoid } from '@/lib/utils'

export const mnetApplications = pgTable(
	'mnet_applications',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		displayName: varchar('display_name', { length: 256 }),
		name: varchar('name', { length: 256 }),
		ssoJumpUrl: varchar('sso_jump_url', { length: 256 }),
		ssoLandUrl: varchar('sso_land_url', { length: 256 }),
		xmlrpcServerUrl: varchar('xmlrpc_server_url', { length: 256 })
	},
	(mnetApplications) => {
		return {
			nameIndex: uniqueIndex('name_idx').on(mnetApplications.name)
		}
	}
)

// Schema for mnetApplications - used to validate API requests
const baseSchema = createSelectSchema(mnetApplications)

export const insertMnetApplicationSchema = createInsertSchema(mnetApplications)
export const insertMnetApplicationParams = baseSchema.extend({}).omit({
	id: true
})

export const updateMnetApplicationSchema = baseSchema
export const updateMnetApplicationParams = baseSchema.extend({})
export const mnetApplicationIdSchema = baseSchema.pick({ id: true })

// Types for mnetApplications - used to type API request params and within Components
export type MnetApplication = typeof mnetApplications.$inferSelect
export type NewMnetApplication = z.infer<typeof insertMnetApplicationSchema>
export type NewMnetApplicationParams = z.infer<
	typeof insertMnetApplicationParams
>
export type UpdateMnetApplicationParams = z.infer<
	typeof updateMnetApplicationParams
>
export type MnetApplicationId = z.infer<typeof mnetApplicationIdSchema>['id']

// this type infers the return from getMnetApplications() - meaning it will include any joins
export type CompleteMnetApplication = Awaited<
	ReturnType<typeof getMnetApplications>
>['mnetApplications'][number]
