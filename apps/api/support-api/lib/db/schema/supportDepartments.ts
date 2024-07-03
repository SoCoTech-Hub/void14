import { varchar, text, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getSupportDepartments } from '@/lib/api/supportDepartments/queries'

import { nanoid } from '@/lib/utils'

export const supportDepartments = pgTable('support_departments', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	description: text('description'),
	userId: varchar('user_id', { length: 256 }).notNull()
})

// Schema for supportDepartments - used to validate API requests
const baseSchema = createSelectSchema(supportDepartments)

export const insertSupportDepartmentSchema =
	createInsertSchema(supportDepartments)
export const insertSupportDepartmentParams = baseSchema.extend({}).omit({
	id: true,
	userId: true
})

export const updateSupportDepartmentSchema = baseSchema
export const updateSupportDepartmentParams = baseSchema.extend({}).omit({
	userId: true
})
export const supportDepartmentIdSchema = baseSchema.pick({ id: true })

// Types for supportDepartments - used to type API request params and within Components
export type SupportDepartment = typeof supportDepartments.$inferSelect
export type NewSupportDepartment = z.infer<typeof insertSupportDepartmentSchema>
export type NewSupportDepartmentParams = z.infer<
	typeof insertSupportDepartmentParams
>
export type UpdateSupportDepartmentParams = z.infer<
	typeof updateSupportDepartmentParams
>
export type SupportDepartmentId = z.infer<
	typeof supportDepartmentIdSchema
>['id']

// this type infers the return from getSupportDepartments() - meaning it will include any joins
export type CompleteSupportDepartment = Awaited<
	ReturnType<typeof getSupportDepartments>
>['supportDepartments'][number]
