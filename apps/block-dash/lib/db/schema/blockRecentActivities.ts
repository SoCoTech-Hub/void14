import { sql } from 'drizzle-orm'
import {
	integer,
	varchar,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getBlockRecentActivities } from '@/lib/api/blockRecentActivities/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const blockRecentActivities = pgTable(
	'block_recent_activities',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		action: integer('action'),
		cmId: varchar('cm_id', { length: 256 }),
		courseId: varchar('course_id', { length: 256 }),
		modName: varchar('mod_name', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(blockRecentActivities) => {
		return {
			courseIdIndex: uniqueIndex('course_id_idx').on(
				blockRecentActivities.courseId
			)
		}
	}
)

// Schema for blockRecentActivities - used to validate API requests
const baseSchema = createSelectSchema(blockRecentActivities).omit(timestamps)

export const insertBlockRecentActivitySchema = createInsertSchema(
	blockRecentActivities
).omit(timestamps)
export const insertBlockRecentActivityParams = baseSchema
	.extend({
		action: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateBlockRecentActivitySchema = baseSchema
export const updateBlockRecentActivityParams = baseSchema
	.extend({
		action: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const blockRecentActivityIdSchema = baseSchema.pick({ id: true })

// Types for blockRecentActivities - used to type API request params and within Components
export type BlockRecentActivity = typeof blockRecentActivities.$inferSelect
export type NewBlockRecentActivity = z.infer<
	typeof insertBlockRecentActivitySchema
>
export type NewBlockRecentActivityParams = z.infer<
	typeof insertBlockRecentActivityParams
>
export type UpdateBlockRecentActivityParams = z.infer<
	typeof updateBlockRecentActivityParams
>
export type BlockRecentActivityId = z.infer<
	typeof blockRecentActivityIdSchema
>['id']

// this type infers the return from getBlockRecentActivities() - meaning it will include any joins
export type CompleteBlockRecentActivity = Awaited<
	ReturnType<typeof getBlockRecentActivities>
>['blockRecentActivities'][number]
