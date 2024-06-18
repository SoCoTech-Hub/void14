import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { roles } from './roles'
import { type getRoleAllowSwitches } from '@/lib/api/roleAllowSwitches/queries'

import { nanoid } from '@/lib/utils'

export const roleAllowSwitches = pgTable('role_allow_switches', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	roleId: varchar('role_id', { length: 256 })
		.references(() => roles.id, { onDelete: 'cascade' })
		.notNull(),
	allowSwitchId: varchar('allow_switch_id', { length: 256 })
		.references(() => roles.id)
		.notNull()
})

// Schema for roleAllowSwitches - used to validate API requests
const baseSchema = createSelectSchema(roleAllowSwitches)

export const insertRoleAllowSwitchSchema = createInsertSchema(roleAllowSwitches)
export const insertRoleAllowSwitchParams = baseSchema
	.extend({
		roleId: z.coerce.string().min(1),
		allowSwitchId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateRoleAllowSwitchSchema = baseSchema
export const updateRoleAllowSwitchParams = baseSchema.extend({
	roleId: z.coerce.string().min(1),
	allowSwitchId: z.coerce.string().min(1)
})
export const roleAllowSwitchIdSchema = baseSchema.pick({ id: true })

// Types for roleAllowSwitches - used to type API request params and within Components
export type RoleAllowSwitch = typeof roleAllowSwitches.$inferSelect
export type NewRoleAllowSwitch = z.infer<typeof insertRoleAllowSwitchSchema>
export type NewRoleAllowSwitchParams = z.infer<
	typeof insertRoleAllowSwitchParams
>
export type UpdateRoleAllowSwitchParams = z.infer<
	typeof updateRoleAllowSwitchParams
>
export type RoleAllowSwitchId = z.infer<typeof roleAllowSwitchIdSchema>['id']

// this type infers the return from getRoleAllowSwitches() - meaning it will include any joins
export type CompleteRoleAllowSwitch = Awaited<
	ReturnType<typeof getRoleAllowSwitches>
>['roleAllowSwitches'][number]
