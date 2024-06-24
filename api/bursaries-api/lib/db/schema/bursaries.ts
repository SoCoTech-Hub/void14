import { sql } from 'drizzle-orm'
import { varchar, text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getBursaries } from '@/lib/api/bursaries/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const bursaries = pgTable('bursaries', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	whoQualifies: text('who_qualifies'),
	application: text('application'),
	value: text('value'),
	particulars: text('particulars'),
	note: text('note'),
	url: varchar('url', { length: 256 }),
	openDate: timestamp('open_date'),
	closeDate: timestamp('close_date'),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for bursaries - used to validate API requests
const baseSchema = createSelectSchema(bursaries).omit(timestamps)

export const insertBursarySchema =
	createInsertSchema(bursaries).omit(timestamps)
export const insertBursaryParams = baseSchema
	.extend({
		openDate: z.coerce.string().min(1),
		closeDate: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateBursarySchema = baseSchema
export const updateBursaryParams = baseSchema
	.extend({
		openDate: z.coerce.string().min(1),
		closeDate: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const bursaryIdSchema = baseSchema.pick({ id: true })

// Types for bursaries - used to type API request params and within Components
export type Bursary = typeof bursaries.$inferSelect
export type NewBursary = z.infer<typeof insertBursarySchema>
export type NewBursaryParams = z.infer<typeof insertBursaryParams>
export type UpdateBursaryParams = z.infer<typeof updateBursaryParams>
export type BursaryId = z.infer<typeof bursaryIdSchema>['id']

// this type infers the return from getBursaries() - meaning it will include any joins
export type CompleteBursary = Awaited<
	ReturnType<typeof getBursaries>
>['bursaries'][number]
