import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getStatsUserMonthlies } from '@/lib/api/statsUserMonthlies/queries'

import { nanoid } from '@/lib/utils'

export const statsUserMonthlies = pgTable('stats_user_monthlies', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	courseId: varchar('course_id', { length: 256 }),
	roleId: varchar('role_id', { length: 256 }),
	statsReads: varchar('stats_reads', { length: 256 }),
	statsWrites: varchar('stats_writes', { length: 256 }),
	statType: varchar('stat_type', { length: 256 }),
	timeEnd: timestamp('time_end'),
	userId: varchar('user_id', { length: 256 }).notNull()
})

// Schema for statsUserMonthlies - used to validate API requests
const baseSchema = createSelectSchema(statsUserMonthlies)

export const insertStatsUserMonthlySchema =
	createInsertSchema(statsUserMonthlies)
export const insertStatsUserMonthlyParams = baseSchema
	.extend({
		timeEnd: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateStatsUserMonthlySchema = baseSchema
export const updateStatsUserMonthlyParams = baseSchema
	.extend({
		timeEnd: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const statsUserMonthlyIdSchema = baseSchema.pick({ id: true })

// Types for statsUserMonthlies - used to type API request params and within Components
export type StatsUserMonthly = typeof statsUserMonthlies.$inferSelect
export type NewStatsUserMonthly = z.infer<typeof insertStatsUserMonthlySchema>
export type NewStatsUserMonthlyParams = z.infer<
	typeof insertStatsUserMonthlyParams
>
export type UpdateStatsUserMonthlyParams = z.infer<
	typeof updateStatsUserMonthlyParams
>
export type StatsUserMonthlyId = z.infer<typeof statsUserMonthlyIdSchema>['id']

// this type infers the return from getStatsUserMonthlies() - meaning it will include any joins
export type CompleteStatsUserMonthly = Awaited<
	ReturnType<typeof getStatsUserMonthlies>
>['statsUserMonthlies'][number]
