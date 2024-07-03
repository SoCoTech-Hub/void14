import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getUserDevices } from '@/lib/api/userDevices/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const userDevices = pgTable(
	'user_devices',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		appId: varchar('app_id', { length: 256 }),
		model: varchar('model', { length: 256 }),
		name: varchar('name', { length: 256 }),
		platform: varchar('platform', { length: 256 }),
		pushId: varchar('push_id', { length: 256 }),
		uuid: varchar('uuid', { length: 256 }),
		version: varchar('version', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(userDevices) => {
		return {
			appIdIndex: uniqueIndex('app_id_idx').on(userDevices.appId)
		}
	}
)

// Schema for userDevices - used to validate API requests
const baseSchema = createSelectSchema(userDevices).omit(timestamps)

export const insertUserDeviceSchema =
	createInsertSchema(userDevices).omit(timestamps)
export const insertUserDeviceParams = baseSchema.extend({}).omit({
	id: true,
	userId: true
})

export const updateUserDeviceSchema = baseSchema
export const updateUserDeviceParams = baseSchema.extend({}).omit({
	userId: true
})
export const userDeviceIdSchema = baseSchema.pick({ id: true })

// Types for userDevices - used to type API request params and within Components
export type UserDevice = typeof userDevices.$inferSelect
export type NewUserDevice = z.infer<typeof insertUserDeviceSchema>
export type NewUserDeviceParams = z.infer<typeof insertUserDeviceParams>
export type UpdateUserDeviceParams = z.infer<typeof updateUserDeviceParams>
export type UserDeviceId = z.infer<typeof userDeviceIdSchema>['id']

// this type infers the return from getUserDevices() - meaning it will include any joins
export type CompleteUserDevice = Awaited<
	ReturnType<typeof getUserDevices>
>['userDevices'][number]
