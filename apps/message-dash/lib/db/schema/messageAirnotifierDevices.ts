import { boolean, varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getMessageAirnotifierDevices } from '@/lib/api/messageAirnotifierDevices/queries'

import { nanoid } from '@/lib/utils'

export const messageAirnotifierDevices = pgTable(
	'message_airnotifier_devices',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		enable: boolean('enable'),
		userDeviceId: varchar('user_device_id', { length: 256 })
	}
)

// Schema for messageAirnotifierDevices - used to validate API requests
const baseSchema = createSelectSchema(messageAirnotifierDevices)

export const insertMessageAirnotifierDeviceSchema = createInsertSchema(
	messageAirnotifierDevices
)
export const insertMessageAirnotifierDeviceParams = baseSchema
	.extend({
		enable: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateMessageAirnotifierDeviceSchema = baseSchema
export const updateMessageAirnotifierDeviceParams = baseSchema.extend({
	enable: z.coerce.boolean()
})
export const messageAirnotifierDeviceIdSchema = baseSchema.pick({ id: true })

// Types for messageAirnotifierDevices - used to type API request params and within Components
export type MessageAirnotifierDevice =
	typeof messageAirnotifierDevices.$inferSelect
export type NewMessageAirnotifierDevice = z.infer<
	typeof insertMessageAirnotifierDeviceSchema
>
export type NewMessageAirnotifierDeviceParams = z.infer<
	typeof insertMessageAirnotifierDeviceParams
>
export type UpdateMessageAirnotifierDeviceParams = z.infer<
	typeof updateMessageAirnotifierDeviceParams
>
export type MessageAirnotifierDeviceId = z.infer<
	typeof messageAirnotifierDeviceIdSchema
>['id']

// this type infers the return from getMessageAirnotifierDevices() - meaning it will include any joins
export type CompleteMessageAirnotifierDevice = Awaited<
	ReturnType<typeof getMessageAirnotifierDevices>
>['messageAirnotifierDevices'][number]
