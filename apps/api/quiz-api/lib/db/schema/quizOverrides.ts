import { integer, varchar, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { quizes } from './quizes'
import { type getQuizOverrides } from '@/lib/api/quizOverrides/queries'

import { nanoid } from '@/lib/utils'

export const quizOverrides = pgTable(
	'quiz_overrides',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		attempts: integer('attempts'),
		groupId: varchar('group_id', { length: 256 }),
		password: varchar('password', { length: 256 }),
		quizId: varchar('quiz_id', { length: 256 })
			.references(() => quizes.id, { onDelete: 'cascade' })
			.notNull(),
		timeClose: integer('time_close'),
		timeLimit: integer('time_limit'),
		timeOpen: integer('time_open'),
		userId: varchar('user_id', { length: 256 }).notNull()
	},
	(quizOverrides) => {
		return {
			quizIdIndex: uniqueIndex('quiz_overrides_quiz_id_idx').on(
				quizOverrides.quizId
			)
		}
	}
)

// Schema for quizOverrides - used to validate API requests
const baseSchema = createSelectSchema(quizOverrides)

export const insertQuizOverrideSchema = createInsertSchema(quizOverrides)
export const insertQuizOverrideParams = baseSchema
	.extend({
		attempts: z.coerce.number(),
		quizId: z.coerce.string().min(1),
		timeClose: z.coerce.number(),
		timeLimit: z.coerce.number(),
		timeOpen: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateQuizOverrideSchema = baseSchema
export const updateQuizOverrideParams = baseSchema
	.extend({
		attempts: z.coerce.number(),
		quizId: z.coerce.string().min(1),
		timeClose: z.coerce.number(),
		timeLimit: z.coerce.number(),
		timeOpen: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const quizOverrideIdSchema = baseSchema.pick({ id: true })

// Types for quizOverrides - used to type API request params and within Components
export type QuizOverride = typeof quizOverrides.$inferSelect
export type NewQuizOverride = z.infer<typeof insertQuizOverrideSchema>
export type NewQuizOverrideParams = z.infer<typeof insertQuizOverrideParams>
export type UpdateQuizOverrideParams = z.infer<typeof updateQuizOverrideParams>
export type QuizOverrideId = z.infer<typeof quizOverrideIdSchema>['id']

// this type infers the return from getQuizOverrides() - meaning it will include any joins
export type CompleteQuizOverride = Awaited<
	ReturnType<typeof getQuizOverrides>
>['quizOverrides'][number]
