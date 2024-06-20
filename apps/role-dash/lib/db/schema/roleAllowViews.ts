import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { roles } from './roles'
import { type getRoleAllowViews } from '@/lib/api/roleAllowViews/queries'

import { nanoid } from '@/lib/utils'

export const roleAllowViews = pgTable('role_allow_views', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	roleId: varchar('role_id', { length: 256 })
		.references(() => roles.id, { onDelete: 'cascade' })
		.notNull(),
	allowViewId: varchar('allow_view_id', { length: 256 })
		.references(() => roles.id)
		.notNull()
})

// Schema for roleAllowViews - used to validate API requests
const baseSchema = createSelectSchema(roleAllowViews)

export const insertRoleAllowViewSchema = createInsertSchema(roleAllowViews)
export const insertRoleAllowViewParams = baseSchema
	.extend({
		roleId: z.coerce.string().min(1),
		allowViewId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateRoleAllowViewSchema = baseSchema
export const updateRoleAllowViewParams = baseSchema.extend({
	roleId: z.coerce.string().min(1),
	allowViewId: z.coerce.string().min(1)
})
export const roleAllowViewIdSchema = baseSchema.pick({ id: true })

// Types for roleAllowViews - used to type API request params and within Components
export type RoleAllowView = typeof roleAllowViews.$inferSelect
export type NewRoleAllowView = z.infer<typeof insertRoleAllowViewSchema>
export type NewRoleAllowViewParams = z.infer<typeof insertRoleAllowViewParams>
export type UpdateRoleAllowViewParams = z.infer<
	typeof updateRoleAllowViewParams
>
export type RoleAllowViewId = z.infer<typeof roleAllowViewIdSchema>['id']

// this type infers the return from getRoleAllowViews() - meaning it will include any joins
export type CompleteRoleAllowView = Awaited<
	ReturnType<typeof getRoleAllowViews>
>['roleAllowViews'][number]
