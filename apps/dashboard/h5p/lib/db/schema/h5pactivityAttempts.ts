import { sql } from 'drizzle-orm'
import {
	integer,
	boolean,
	varchar,
	real,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getH5pactivityAttempts } from '@/lib/api/h5pactivityAttempts/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const h5pactivityAttempts = pgTable('h5pactivity_attempts', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	attempt: integer('attempt'),
	completion: boolean('completion'),
	duration: integer('duration'),
	h5pActivityId: varchar('h5p_activity_id', { length: 256 }),
	maxScore: integer('max_score'),
	rawScore: integer('raw_score'),
	scaled: real('scaled'),
	success: boolean('success'),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for h5pactivityAttempts - used to validate API requests
const baseSchema = createSelectSchema(h5pactivityAttempts).omit(timestamps)

export const insertH5pactivityAttemptSchema =
	createInsertSchema(h5pactivityAttempts).omit(timestamps)
export const insertH5pactivityAttemptParams = baseSchema
	.extend({
		attempt: z.coerce.number(),
		completion: z.coerce.boolean(),
		duration: z.coerce.number(),
		maxScore: z.coerce.number(),
		rawScore: z.coerce.number(),
		scaled: z.coerce.number(),
		success: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateH5pactivityAttemptSchema = baseSchema
export const updateH5pactivityAttemptParams = baseSchema
	.extend({
		attempt: z.coerce.number(),
		completion: z.coerce.boolean(),
		duration: z.coerce.number(),
		maxScore: z.coerce.number(),
		rawScore: z.coerce.number(),
		scaled: z.coerce.number(),
		success: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const h5pactivityAttemptIdSchema = baseSchema.pick({ id: true })

// Types for h5pactivityAttempts - used to type API request params and within Components
export type H5pactivityAttempt = typeof h5pactivityAttempts.$inferSelect
export type NewH5pactivityAttempt = z.infer<
	typeof insertH5pactivityAttemptSchema
>
export type NewH5pactivityAttemptParams = z.infer<
	typeof insertH5pactivityAttemptParams
>
export type UpdateH5pactivityAttemptParams = z.infer<
	typeof updateH5pactivityAttemptParams
>
export type H5pactivityAttemptId = z.infer<
	typeof h5pactivityAttemptIdSchema
>['id']

// this type infers the return from getH5pactivityAttempts() - meaning it will include any joins
export type CompleteH5pactivityAttempt = Awaited<
	ReturnType<typeof getH5pactivityAttempts>
>['h5pactivityAttempts'][number]
