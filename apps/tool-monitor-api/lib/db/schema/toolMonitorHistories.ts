import { sql } from 'drizzle-orm'
import { varchar, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getToolMonitorHistories } from '@/lib/api/toolMonitorHistories/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const toolMonitorHistories = pgTable('tool_monitor_histories', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	sid: varchar('sid', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for toolMonitorHistories - used to validate API requests
const baseSchema = createSelectSchema(toolMonitorHistories).omit(timestamps)

export const insertToolMonitorHistorySchema =
	createInsertSchema(toolMonitorHistories).omit(timestamps)
export const insertToolMonitorHistoryParams = baseSchema
	.extend({
		del: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateToolMonitorHistorySchema = baseSchema
export const updateToolMonitorHistoryParams = baseSchema
	.extend({
		del: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const toolMonitorHistoryIdSchema = baseSchema.pick({ id: true })

// Types for toolMonitorHistories - used to type API request params and within Components
export type ToolMonitorHistory = typeof toolMonitorHistories.$inferSelect
export type NewToolMonitorHistory = z.infer<
	typeof insertToolMonitorHistorySchema
>
export type NewToolMonitorHistoryParams = z.infer<
	typeof insertToolMonitorHistoryParams
>
export type UpdateToolMonitorHistoryParams = z.infer<
	typeof updateToolMonitorHistoryParams
>
export type ToolMonitorHistoryId = z.infer<
	typeof toolMonitorHistoryIdSchema
>['id']

// this type infers the return from getToolMonitorHistories() - meaning it will include any joins
export type CompleteToolMonitorHistory = Awaited<
	ReturnType<typeof getToolMonitorHistories>
>['toolMonitorHistories'][number]
