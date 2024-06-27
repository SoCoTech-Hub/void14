import { sql } from 'drizzle-orm'
import {
	real,
	integer,
	varchar,
	boolean,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getQuizStatistics } from '@/lib/api/quizStatistics/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const quizStatistics = pgTable(
	'quiz_statistics',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		allAttemptsAvg: real('all_attempts_avg'),
		allAttemptsCount: integer('all_attempts_count'),
		cic: real('cic'),
		errorRatio: real('error_ratio'),
		firstAttemptsAvg: real('first_attempts_avg'),
		firstAttemptsCount: integer('first_attempts_count').notNull(),
		hashcode: varchar('hashcode', { length: 256 }),
		highestAttemptsAvg: real('highest_attempts_avg'),
		highestAttemptsCount: integer('highest_attempts_count').notNull(),
		kurtosis: real('kurtosis'),
		lastAttemptsAvg: real('last_attempts_avg'),
		lastAttemptsCount: integer('last_attempts_count').notNull(),
		median: real('median'),
		skewness: real('skewness'),
		standardDeviation: real('standard_deviation'),
		standardError: real('standard_error'),
		whichAttempts: boolean('which_attempts').notNull().default(false),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(quizStatistics) => {
		return {
			hashcodeIndex: uniqueIndex('quiz_statistics_hashcode_idx').on(
				quizStatistics.hashcode
			)
		}
	}
)

// Schema for quizStatistics - used to validate API requests
const baseSchema = createSelectSchema(quizStatistics).omit(timestamps)

export const insertQuizStatisticSchema =
	createInsertSchema(quizStatistics).omit(timestamps)
export const insertQuizStatisticParams = baseSchema
	.extend({
		allAttemptsAvg: z.coerce.number(),
		allAttemptsCount: z.coerce.number(),
		cic: z.coerce.number(),
		errorRatio: z.coerce.number(),
		firstAttemptsAvg: z.coerce.number(),
		firstAttemptsCount: z.coerce.number(),
		highestAttemptsAvg: z.coerce.number(),
		highestAttemptsCount: z.coerce.number(),
		kurtosis: z.coerce.number(),
		lastAttemptsAvg: z.coerce.number(),
		lastAttemptsCount: z.coerce.number(),
		median: z.coerce.number(),
		skewness: z.coerce.number(),
		standardDeviation: z.coerce.number(),
		standardError: z.coerce.number(),
		whichAttempts: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateQuizStatisticSchema = baseSchema
export const updateQuizStatisticParams = baseSchema.extend({
	allAttemptsAvg: z.coerce.number(),
	allAttemptsCount: z.coerce.number(),
	cic: z.coerce.number(),
	errorRatio: z.coerce.number(),
	firstAttemptsAvg: z.coerce.number(),
	firstAttemptsCount: z.coerce.number(),
	highestAttemptsAvg: z.coerce.number(),
	highestAttemptsCount: z.coerce.number(),
	kurtosis: z.coerce.number(),
	lastAttemptsAvg: z.coerce.number(),
	lastAttemptsCount: z.coerce.number(),
	median: z.coerce.number(),
	skewness: z.coerce.number(),
	standardDeviation: z.coerce.number(),
	standardError: z.coerce.number(),
	whichAttempts: z.coerce.boolean()
})
export const quizStatisticIdSchema = baseSchema.pick({ id: true })

// Types for quizStatistics - used to type API request params and within Components
export type QuizStatistic = typeof quizStatistics.$inferSelect
export type NewQuizStatistic = z.infer<typeof insertQuizStatisticSchema>
export type NewQuizStatisticParams = z.infer<typeof insertQuizStatisticParams>
export type UpdateQuizStatisticParams = z.infer<
	typeof updateQuizStatisticParams
>
export type QuizStatisticId = z.infer<typeof quizStatisticIdSchema>['id']

// this type infers the return from getQuizStatistics() - meaning it will include any joins
export type CompleteQuizStatistic = Awaited<
	ReturnType<typeof getQuizStatistics>
>['quizStatistics'][number]
