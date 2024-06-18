import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { roles } from './roles'
import { type getRoleCapabilities } from '@/lib/api/roleCapabilities/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const roleCapabilities = pgTable('role_capabilities', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	capability: varchar('capability', { length: 256 }),
	contextId: varchar('context_id', { length: 256 }),
	permission: varchar('permission', { length: 256 }),
	roleId: varchar('role_id', { length: 256 })
		.references(() => roles.id)
		.notNull(),
	userId: varchar('user_id', { length: 256 }).notNull(),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for roleCapabilities - used to validate API requests
const baseSchema = createSelectSchema(roleCapabilities).omit(timestamps)

export const insertRoleCapabilitySchema =
	createInsertSchema(roleCapabilities).omit(timestamps)
export const insertRoleCapabilityParams = baseSchema
	.extend({
		roleId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateRoleCapabilitySchema = baseSchema
export const updateRoleCapabilityParams = baseSchema
	.extend({
		roleId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const roleCapabilityIdSchema = baseSchema.pick({ id: true })

// Types for roleCapabilities - used to type API request params and within Components
export type RoleCapability = typeof roleCapabilities.$inferSelect
export type NewRoleCapability = z.infer<typeof insertRoleCapabilitySchema>
export type NewRoleCapabilityParams = z.infer<typeof insertRoleCapabilityParams>
export type UpdateRoleCapabilityParams = z.infer<
	typeof updateRoleCapabilityParams
>
export type RoleCapabilityId = z.infer<typeof roleCapabilityIdSchema>['id']

// this type infers the return from getRoleCapabilities() - meaning it will include any joins
export type CompleteRoleCapability = Awaited<
	ReturnType<typeof getRoleCapabilities>
>['roleCapabilities'][number]
