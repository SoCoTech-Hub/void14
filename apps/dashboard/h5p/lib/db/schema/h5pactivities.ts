import { sql } from 'drizzle-orm'
import {
	varchar,
	integer,
	boolean,
	text,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getH5pactivities } from '@/lib/api/h5pactivities/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const h5pactivities = pgTable('h5pactivities', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	course: varchar('course', { length: 256 }),
	displayOptions: integer('display_options'),
	enableTracking: boolean('enable_tracking'),
	grade: integer('grade'),
	gradeMethod: integer('grade_method'),
	intro: text('intro'),
	introFormat: integer('intro_format'),
	name: varchar('name', { length: 256 }),
	reviewMode: integer('review_mode'),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for h5pactivities - used to validate API requests
const baseSchema = createSelectSchema(h5pactivities).omit(timestamps)

export const insertH5pactivitySchema =
	createInsertSchema(h5pactivities).omit(timestamps)
export const insertH5pactivityParams = baseSchema
	.extend({
		displayOptions: z.coerce.number(),
		enableTracking: z.coerce.boolean(),
		grade: z.coerce.number(),
		gradeMethod: z.coerce.number(),
		introFormat: z.coerce.number(),
		reviewMode: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateH5pactivitySchema = baseSchema
export const updateH5pactivityParams = baseSchema.extend({
	displayOptions: z.coerce.number(),
	enableTracking: z.coerce.boolean(),
	grade: z.coerce.number(),
	gradeMethod: z.coerce.number(),
	introFormat: z.coerce.number(),
	reviewMode: z.coerce.number()
})
export const h5pactivityIdSchema = baseSchema.pick({ id: true })

// Types for h5pactivities - used to type API request params and within Components
export type H5pactivity = typeof h5pactivities.$inferSelect
export type NewH5pactivity = z.infer<typeof insertH5pactivitySchema>
export type NewH5pactivityParams = z.infer<typeof insertH5pactivityParams>
export type UpdateH5pactivityParams = z.infer<typeof updateH5pactivityParams>
export type H5pactivityId = z.infer<typeof h5pactivityIdSchema>['id']

// this type infers the return from getH5pactivities() - meaning it will include any joins
export type CompleteH5pactivity = Awaited<
	ReturnType<typeof getH5pactivities>
>['h5pactivities'][number]
