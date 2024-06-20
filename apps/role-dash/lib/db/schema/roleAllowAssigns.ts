import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { roles } from './roles'
import { roles } from './roles'
import { type getRoleAllowAssigns } from '@/lib/api/roleAllowAssigns/queries'

import { nanoid } from '@/lib/utils'

export const roleAllowAssigns = pgTable('role_allow_assigns', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	roleId: varchar('role_id', { length: 256 })
		.references(() => roles.id)
		.notNull(),
	allowRoleId: varchar('allow_assign_id', { length: 256 })
		.references(() => roles.id)
		.notNull()
})

// Schema for roleAllowAssigns - used to validate API requests
const baseSchema = createSelectSchema(roleAllowAssigns)

export const insertRoleAllowAssignSchema = createInsertSchema(roleAllowAssigns)
export const insertRoleAllowAssignParams = baseSchema
	.extend({
		roleId: z.coerce.string().min(1),
		allowRoleId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateRoleAllowAssignSchema = baseSchema
export const updateRoleAllowAssignParams = baseSchema.extend({
	roleId: z.coerce.string().min(1),
	allowRoleId: z.coerce.string().min(1)
})
export const roleAllowAssignIdSchema = baseSchema.pick({ id: true })

// Types for roleAllowAssigns - used to type API request params and within Components
export type RoleAllowAssign = typeof roleAllowAssigns.$inferSelect
export type NewRoleAllowAssign = z.infer<typeof insertRoleAllowAssignSchema>
export type NewRoleAllowAssignParams = z.infer<
	typeof insertRoleAllowAssignParams
>
export type UpdateRoleAllowAssignParams = z.infer<
	typeof updateRoleAllowAssignParams
>
export type RoleAllowAssignId = z.infer<typeof roleAllowAssignIdSchema>['id']

// this type infers the return from getRoleAllowAssigns() - meaning it will include any joins
export type CompleteRoleAllowAssign = Awaited<
	ReturnType<typeof getRoleAllowAssigns>
>['roleAllowAssigns'][number]
