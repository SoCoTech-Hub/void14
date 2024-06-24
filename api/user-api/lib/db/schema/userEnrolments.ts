import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getUserEnrolments } from '@/lib/api/userEnrolments/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const userEnrolments = pgTable('user_enrolments', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	enrolId: varchar('enrol_id', { length: 256 }),
	modifierId: varchar('modifier_id', { length: 256 }),
	status: varchar('status', { length: 256 }),
	timeStart: timestamp('time_start'),
	timeEnd: timestamp('time_end'),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for userEnrolments - used to validate API requests
const baseSchema = createSelectSchema(userEnrolments).omit(timestamps)

export const insertUserEnrolmentSchema =
	createInsertSchema(userEnrolments).omit(timestamps)
export const insertUserEnrolmentParams = baseSchema
	.extend({
		timeStart: z.coerce.string().min(1),
		timeEnd: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateUserEnrolmentSchema = baseSchema
export const updateUserEnrolmentParams = baseSchema
	.extend({
		timeStart: z.coerce.string().min(1),
		timeEnd: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const userEnrolmentIdSchema = baseSchema.pick({ id: true })

// Types for userEnrolments - used to type API request params and within Components
export type UserEnrolment = typeof userEnrolments.$inferSelect
export type NewUserEnrolment = z.infer<typeof insertUserEnrolmentSchema>
export type NewUserEnrolmentParams = z.infer<typeof insertUserEnrolmentParams>
export type UpdateUserEnrolmentParams = z.infer<
	typeof updateUserEnrolmentParams
>
export type UserEnrolmentId = z.infer<typeof userEnrolmentIdSchema>['id']

// this type infers the return from getUserEnrolments() - meaning it will include any joins
export type CompleteUserEnrolment = Awaited<
	ReturnType<typeof getUserEnrolments>
>['userEnrolments'][number]
