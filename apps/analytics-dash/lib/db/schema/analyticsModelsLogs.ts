import { sql } from 'drizzle-orm'
import {
	text,
	varchar,
	real,
	integer,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getAnalyticsModelsLogs } from '@/lib/api/analyticsModelsLogs/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const analyticsModelsLogs = pgTable(
	'analytics_models_logs',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		dir: text('dir'),
		evaluationMode: varchar('evaluation_mode', { length: 256 }),
		indicators: text('indicators'),
		info: text('info'),
		modelId: varchar('model_id', { length: 256 }),
		score: real('score'),
		target: varchar('target', { length: 256 }),
		timeSplitting: varchar('time_splitting', { length: 256 }),
		version: integer('version'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(analyticsModelsLogs) => {
		return {
			modelIdIndex: uniqueIndex('model_id_idx').on(analyticsModelsLogs.modelId)
		}
	}
)

// Schema for analyticsModelsLogs - used to validate API requests
const baseSchema = createSelectSchema(analyticsModelsLogs).omit(timestamps)

export const insertAnalyticsModelsLogSchema =
	createInsertSchema(analyticsModelsLogs).omit(timestamps)
export const insertAnalyticsModelsLogParams = baseSchema
	.extend({
		score: z.coerce.number(),
		version: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateAnalyticsModelsLogSchema = baseSchema
export const updateAnalyticsModelsLogParams = baseSchema
	.extend({
		score: z.coerce.number(),
		version: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const analyticsModelsLogIdSchema = baseSchema.pick({ id: true })

// Types for analyticsModelsLogs - used to type API request params and within Components
export type AnalyticsModelsLog = typeof analyticsModelsLogs.$inferSelect
export type NewAnalyticsModelsLog = z.infer<
	typeof insertAnalyticsModelsLogSchema
>
export type NewAnalyticsModelsLogParams = z.infer<
	typeof insertAnalyticsModelsLogParams
>
export type UpdateAnalyticsModelsLogParams = z.infer<
	typeof updateAnalyticsModelsLogParams
>
export type AnalyticsModelsLogId = z.infer<
	typeof analyticsModelsLogIdSchema
>['id']

// this type infers the return from getAnalyticsModelsLogs() - meaning it will include any joins
export type CompleteAnalyticsModelsLog = Awaited<
	ReturnType<typeof getAnalyticsModelsLogs>
>['analyticsModelsLogs'][number]
