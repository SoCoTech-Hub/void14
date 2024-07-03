import { sql } from 'drizzle-orm'
import {
	text,
	boolean,
	varchar,
	integer,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getQuizaccessSebTemplates } from '@/lib/api/quizaccessSebTemplates/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const quizaccessSebTemplates = pgTable(
	'quizaccess_seb_templates',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		content: text('content'),
		description: text('description'),
		enabled: boolean('enabled').notNull(),
		name: varchar('name', { length: 256 }).notNull(),
		sortOrder: integer('sort_order'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(quizaccessSebTemplates) => {
		return {
			nameIndex: uniqueIndex('name_idx').on(quizaccessSebTemplates.name)
		}
	}
)

// Schema for quizaccessSebTemplates - used to validate API requests
const baseSchema = createSelectSchema(quizaccessSebTemplates).omit(timestamps)

export const insertQuizaccessSebTemplateSchema = createInsertSchema(
	quizaccessSebTemplates
).omit(timestamps)
export const insertQuizaccessSebTemplateParams = baseSchema
	.extend({
		enabled: z.coerce.boolean(),
		sortOrder: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateQuizaccessSebTemplateSchema = baseSchema
export const updateQuizaccessSebTemplateParams = baseSchema
	.extend({
		enabled: z.coerce.boolean(),
		sortOrder: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const quizaccessSebTemplateIdSchema = baseSchema.pick({ id: true })

// Types for quizaccessSebTemplates - used to type API request params and within Components
export type QuizaccessSebTemplate = typeof quizaccessSebTemplates.$inferSelect
export type NewQuizaccessSebTemplate = z.infer<
	typeof insertQuizaccessSebTemplateSchema
>
export type NewQuizaccessSebTemplateParams = z.infer<
	typeof insertQuizaccessSebTemplateParams
>
export type UpdateQuizaccessSebTemplateParams = z.infer<
	typeof updateQuizaccessSebTemplateParams
>
export type QuizaccessSebTemplateId = z.infer<
	typeof quizaccessSebTemplateIdSchema
>['id']

// this type infers the return from getQuizaccessSebTemplates() - meaning it will include any joins
export type CompleteQuizaccessSebTemplate = Awaited<
	ReturnType<typeof getQuizaccessSebTemplates>
>['quizaccessSebTemplates'][number]
