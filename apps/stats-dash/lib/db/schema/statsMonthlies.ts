import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getStatsMonthlies } from '@/lib/api/statsMonthlies/queries'

import { nanoid } from '@/lib/utils'

export const statsMonthlies = pgTable('stats_monthlies', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	courseId: varchar('course_id', { length: 256 }),
	roleId: varchar('role_id', { length: 256 }),
	stat1: varchar('stat1', { length: 256 }),
	stat2: varchar('stat2', { length: 256 }),
	statType: varchar('stat_type', { length: 256 }),
	timeEnd: timestamp('time_end')
})

// Schema for statsMonthlies - used to validate API requests
const baseSchema = createSelectSchema(statsMonthlies)

export const insertStatsMonthlySchema = createInsertSchema(statsMonthlies)
export const insertStatsMonthlyParams = baseSchema
	.extend({
		timeEnd: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateStatsMonthlySchema = baseSchema
export const updateStatsMonthlyParams = baseSchema.extend({
	timeEnd: z.coerce.string().min(1)
})
export const statsMonthlyIdSchema = baseSchema.pick({ id: true })

// Types for statsMonthlies - used to type API request params and within Components
export type StatsMonthly = typeof statsMonthlies.$inferSelect
export type NewStatsMonthly = z.infer<typeof insertStatsMonthlySchema>
export type NewStatsMonthlyParams = z.infer<typeof insertStatsMonthlyParams>
export type UpdateStatsMonthlyParams = z.infer<typeof updateStatsMonthlyParams>
export type StatsMonthlyId = z.infer<typeof statsMonthlyIdSchema>['id']

// this type infers the return from getStatsMonthlies() - meaning it will include any joins
export type CompleteStatsMonthly = Awaited<
	ReturnType<typeof getStatsMonthlies>
>['statsMonthlies'][number]
