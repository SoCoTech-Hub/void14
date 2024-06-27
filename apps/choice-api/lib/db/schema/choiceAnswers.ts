import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { choiceOptions } from './choiceOptions'
import { choices } from './choices'
import { type getChoiceAnswers } from '@/lib/api/choiceAnswers/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const choiceAnswers = pgTable('choice_answers', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	choiceOptionId: varchar('choice_option_id', { length: 256 })
		.references(() => choiceOptions.id, { onDelete: 'cascade' })
		.notNull(),
	choiceId: varchar('choice_id', { length: 256 })
		.references(() => choices.id, { onDelete: 'cascade' })
		.notNull(),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for choiceAnswers - used to validate API requests
const baseSchema = createSelectSchema(choiceAnswers).omit(timestamps)

export const insertChoiceAnswerSchema =
	createInsertSchema(choiceAnswers).omit(timestamps)
export const insertChoiceAnswerParams = baseSchema
	.extend({
		choiceOptionId: z.coerce.string().min(1),
		choiceId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateChoiceAnswerSchema = baseSchema
export const updateChoiceAnswerParams = baseSchema
	.extend({
		choiceOptionId: z.coerce.string().min(1),
		choiceId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const choiceAnswerIdSchema = baseSchema.pick({ id: true })

// Types for choiceAnswers - used to type API request params and within Components
export type ChoiceAnswer = typeof choiceAnswers.$inferSelect
export type NewChoiceAnswer = z.infer<typeof insertChoiceAnswerSchema>
export type NewChoiceAnswerParams = z.infer<typeof insertChoiceAnswerParams>
export type UpdateChoiceAnswerParams = z.infer<typeof updateChoiceAnswerParams>
export type ChoiceAnswerId = z.infer<typeof choiceAnswerIdSchema>['id']

// this type infers the return from getChoiceAnswers() - meaning it will include any joins
export type CompleteChoiceAnswer = Awaited<
	ReturnType<typeof getChoiceAnswers>
>['choiceAnswers'][number]
