import { sql } from 'drizzle-orm'
import { varchar, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getRatings } from '@/lib/api/ratings/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const ratings = pgTable(
	'ratings',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		component: varchar('component', { length: 256 }).notNull(),
		contextId: varchar('context_id', { length: 256 }).notNull(),
		itemId: varchar('item_id', { length: 256 }).notNull(),
		rating: integer('rating').notNull(),
		ratingArea: varchar('rating_area', { length: 256 }).notNull(),
		scaleId: varchar('scale_id', { length: 256 }).notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(ratings) => {
		return {
			scaleIdIndex: uniqueIndex('scale_id_idx').on(ratings.scaleId)
		}
	}
)

// Schema for ratings - used to validate API requests
const baseSchema = createSelectSchema(ratings).omit(timestamps)

export const insertRatingSchema = createInsertSchema(ratings).omit(timestamps)
export const insertRatingParams = baseSchema
	.extend({
		rating: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateRatingSchema = baseSchema
export const updateRatingParams = baseSchema
	.extend({
		rating: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const ratingIdSchema = baseSchema.pick({ id: true })

// Types for ratings - used to type API request params and within Components
export type Rating = typeof ratings.$inferSelect
export type NewRating = z.infer<typeof insertRatingSchema>
export type NewRatingParams = z.infer<typeof insertRatingParams>
export type UpdateRatingParams = z.infer<typeof updateRatingParams>
export type RatingId = z.infer<typeof ratingIdSchema>['id']

// this type infers the return from getRatings() - meaning it will include any joins
export type CompleteRating = Awaited<
	ReturnType<typeof getRatings>
>['ratings'][number]
