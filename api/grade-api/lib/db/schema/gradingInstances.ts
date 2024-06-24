import { sql } from 'drizzle-orm'
import {
	varchar,
	text,
	integer,
	real,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getGradingInstances } from '@/lib/api/gradingInstances/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const gradingInstances = pgTable('grading_instances', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	definitionId: varchar('definition_id', { length: 256 }),
	feedback: text('feedback'),
	feedbackFormat: integer('feedback_format'),
	itemId: varchar('item_id', { length: 256 }),
	raterId: varchar('rater_id', { length: 256 }),
	rawGrade: real('raw_grade'),
	status: integer('status'),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for gradingInstances - used to validate API requests
const baseSchema = createSelectSchema(gradingInstances).omit(timestamps)

export const insertGradingInstanceSchema =
	createInsertSchema(gradingInstances).omit(timestamps)
export const insertGradingInstanceParams = baseSchema
	.extend({
		feedbackFormat: z.coerce.number(),
		rawGrade: z.coerce.number(),
		status: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateGradingInstanceSchema = baseSchema
export const updateGradingInstanceParams = baseSchema.extend({
	feedbackFormat: z.coerce.number(),
	rawGrade: z.coerce.number(),
	status: z.coerce.number()
})
export const gradingInstanceIdSchema = baseSchema.pick({ id: true })

// Types for gradingInstances - used to type API request params and within Components
export type GradingInstance = typeof gradingInstances.$inferSelect
export type NewGradingInstance = z.infer<typeof insertGradingInstanceSchema>
export type NewGradingInstanceParams = z.infer<
	typeof insertGradingInstanceParams
>
export type UpdateGradingInstanceParams = z.infer<
	typeof updateGradingInstanceParams
>
export type GradingInstanceId = z.infer<typeof gradingInstanceIdSchema>['id']

// this type infers the return from getGradingInstances() - meaning it will include any joins
export type CompleteGradingInstance = Awaited<
	ReturnType<typeof getGradingInstances>
>['gradingInstances'][number]
