import { sql } from 'drizzle-orm'
import {
	varchar,
	integer,
	boolean,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { digilibCategories } from './digilibCategories'
import { type getDigilibs } from '@/lib/api/digilibs/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const digilibs = pgTable(
	'digilibs',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		name: varchar('name', { length: 256 }).notNull(),
		estimatedReadingTime: integer('estimated_reading_time'),
		releaseYear: integer('release_year'),
		link: varchar('link', { length: 256 }),
		language: varchar('language', { length: 256 }),
		isDownloadable: boolean('is_downloadable'),
		attachment: varchar('attachment', { length: 256 }),
		digilibCategoryId: varchar('digilib_category_id', { length: 256 })
			.references(() => digilibCategories.id, { onDelete: 'cascade' })
			.notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(digilibs) => {
		return {
			digilibCategoryIdIndex: uniqueIndex('digilib_category_id_idx').on(
				digilibs.digilibCategoryId
			)
		}
	}
)

// Schema for digilibs - used to validate API requests
const baseSchema = createSelectSchema(digilibs).omit(timestamps)

export const insertDigilibSchema = createInsertSchema(digilibs).omit(timestamps)
export const insertDigilibParams = baseSchema
	.extend({
		estimatedReadingTime: z.coerce.number(),
		releaseYear: z.coerce.number(),
		isDownloadable: z.coerce.boolean(),
		digilibCategoryId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateDigilibSchema = baseSchema
export const updateDigilibParams = baseSchema.extend({
	estimatedReadingTime: z.coerce.number(),
	releaseYear: z.coerce.number(),
	isDownloadable: z.coerce.boolean(),
	digilibCategoryId: z.coerce.string().min(1)
})
export const digilibIdSchema = baseSchema.pick({ id: true })

// Types for digilibs - used to type API request params and within Components
export type Digilib = typeof digilibs.$inferSelect
export type NewDigilib = z.infer<typeof insertDigilibSchema>
export type NewDigilibParams = z.infer<typeof insertDigilibParams>
export type UpdateDigilibParams = z.infer<typeof updateDigilibParams>
export type DigilibId = z.infer<typeof digilibIdSchema>['id']

// this type infers the return from getDigilibs() - meaning it will include any joins
export type CompleteDigilib = Awaited<
	ReturnType<typeof getDigilibs>
>['digilibs'][number]
