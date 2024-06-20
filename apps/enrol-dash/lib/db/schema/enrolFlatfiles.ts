import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getEnrolFlatfiles } from '@/lib/api/enrolFlatfiles/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const enrolFlatfiles = pgTable('enrol_flatfiles', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	action: varchar('action', { length: 256 }),
	courseId: varchar('course_id', { length: 256 }),
	roleId: varchar('role_id', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	startTime: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	endTime: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for enrolFlatfiles - used to validate API requests
const baseSchema = createSelectSchema(enrolFlatfiles).omit(timestamps)

export const insertEnrolFlatfileSchema =
	createInsertSchema(enrolFlatfiles).omit(timestamps)
export const insertEnrolFlatfileParams = baseSchema.extend({}).omit({
	id: true,
	userId: true
})

export const updateEnrolFlatfileSchema = baseSchema
export const updateEnrolFlatfileParams = baseSchema.extend({}).omit({
	userId: true
})
export const enrolFlatfileIdSchema = baseSchema.pick({ id: true })

// Types for enrolFlatfiles - used to type API request params and within Components
export type EnrolFlatfile = typeof enrolFlatfiles.$inferSelect
export type NewEnrolFlatfile = z.infer<typeof insertEnrolFlatfileSchema>
export type NewEnrolFlatfileParams = z.infer<typeof insertEnrolFlatfileParams>
export type UpdateEnrolFlatfileParams = z.infer<
	typeof updateEnrolFlatfileParams
>
export type EnrolFlatfileId = z.infer<typeof enrolFlatfileIdSchema>['id']

// this type infers the return from getEnrolFlatfiles() - meaning it will include any joins
export type CompleteEnrolFlatfile = Awaited<
	ReturnType<typeof getEnrolFlatfiles>
>['enrolFlatfiles'][number]
