import { sql } from 'drizzle-orm'
import {
	varchar,
	text,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { showsCategories } from './showsCategories'
import { type getShows } from '@/lib/api/shows/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const shows = pgTable(
	'shows',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		name: varchar('name', { length: 256 }).notNull(),
		image: varchar('image', { length: 256 }),
		url: varchar('url', { length: 256 }),
		description: text('description'),
		transcript: text('transcript'),
		showsCategoryId: varchar('shows_category_id', { length: 256 })
			.references(() => showsCategories.id, { onDelete: 'cascade' })
			.notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(shows) => {
		return {
			nameIndex: uniqueIndex('name_idx').on(shows.name)
		}
	}
)

// Schema for shows - used to validate API requests
const baseSchema = createSelectSchema(shows).omit(timestamps)

export const insertShowSchema = createInsertSchema(shows).omit(timestamps)
export const insertShowParams = baseSchema
	.extend({
		showsCategoryId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateShowSchema = baseSchema
export const updateShowParams = baseSchema.extend({
	showsCategoryId: z.coerce.string().min(1)
})
export const showIdSchema = baseSchema.pick({ id: true })

// Types for shows - used to type API request params and within Components
export type Show = typeof shows.$inferSelect
export type NewShow = z.infer<typeof insertShowSchema>
export type NewShowParams = z.infer<typeof insertShowParams>
export type UpdateShowParams = z.infer<typeof updateShowParams>
export type ShowId = z.infer<typeof showIdSchema>['id']

// this type infers the return from getShows() - meaning it will include any joins
export type CompleteShow = Awaited<ReturnType<typeof getShows>>['shows'][number]
