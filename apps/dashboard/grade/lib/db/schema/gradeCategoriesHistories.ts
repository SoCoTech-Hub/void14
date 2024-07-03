import { sql } from 'drizzle-orm'
import {
	varchar,
	boolean,
	integer,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getGradeCategoriesHistories } from '@/lib/api/gradeCategoriesHistories/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const gradeCategoriesHistories = pgTable('grade_categories_histories', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	action: varchar('action', { length: 256 }),
	aggregateOnlyGraded: boolean('aggregate_only_graded'),
	aggregateOutcomes: boolean('aggregate_outcomes'),
	aggregateSubCats: boolean('aggregate_sub_cats'),
	aggregation: integer('aggregation'),
	courseId: varchar('course_id', { length: 256 }),
	depth: integer('depth'),
	dropLow: integer('drop_low'),
	fullName: varchar('full_name', { length: 256 }),
	hidden: boolean('hidden'),
	keepHigh: integer('keep_high'),
	loggedUser: varchar('logged_user', { length: 256 }),
	oldId: varchar('old_id', { length: 256 }),
	parent: varchar('parent', { length: 256 }),
	path: varchar('path', { length: 256 }),
	source: varchar('source', { length: 256 }),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for gradeCategoriesHistories - used to validate API requests
const baseSchema = createSelectSchema(gradeCategoriesHistories).omit(timestamps)

export const insertGradeCategoriesHistorySchema = createInsertSchema(
	gradeCategoriesHistories
).omit(timestamps)
export const insertGradeCategoriesHistoryParams = baseSchema
	.extend({
		aggregateOnlyGraded: z.coerce.boolean(),
		aggregateOutcomes: z.coerce.boolean(),
		aggregateSubCats: z.coerce.boolean(),
		aggregation: z.coerce.number(),
		depth: z.coerce.number(),
		dropLow: z.coerce.number(),
		hidden: z.coerce.boolean(),
		keepHigh: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateGradeCategoriesHistorySchema = baseSchema
export const updateGradeCategoriesHistoryParams = baseSchema.extend({
	aggregateOnlyGraded: z.coerce.boolean(),
	aggregateOutcomes: z.coerce.boolean(),
	aggregateSubCats: z.coerce.boolean(),
	aggregation: z.coerce.number(),
	depth: z.coerce.number(),
	dropLow: z.coerce.number(),
	hidden: z.coerce.boolean(),
	keepHigh: z.coerce.number()
})
export const gradeCategoriesHistoryIdSchema = baseSchema.pick({ id: true })

// Types for gradeCategoriesHistories - used to type API request params and within Components
export type GradeCategoriesHistory =
	typeof gradeCategoriesHistories.$inferSelect
export type NewGradeCategoriesHistory = z.infer<
	typeof insertGradeCategoriesHistorySchema
>
export type NewGradeCategoriesHistoryParams = z.infer<
	typeof insertGradeCategoriesHistoryParams
>
export type UpdateGradeCategoriesHistoryParams = z.infer<
	typeof updateGradeCategoriesHistoryParams
>
export type GradeCategoriesHistoryId = z.infer<
	typeof gradeCategoriesHistoryIdSchema
>['id']

// this type infers the return from getGradeCategoriesHistories() - meaning it will include any joins
export type CompleteGradeCategoriesHistory = Awaited<
	ReturnType<typeof getGradeCategoriesHistories>
>['gradeCategoriesHistories'][number]
