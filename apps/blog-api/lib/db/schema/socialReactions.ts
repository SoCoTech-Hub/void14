import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { blogs } from './blogs'
import { socialIcons } from './socialIcons'
import type { getSocialReactions } from '@/lib/api/socialReactions/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const socialReactions = pgTable(
	'social_reactions',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		blogId: varchar('blog_id', { length: 256 })
			.references(() => blogs.id)
			.notNull(),
		socialIconId: varchar('social_icon_id', { length: 256 })
			.references(() => socialIcons.id)
			.notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),
		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(socialReactions) => {
		return {
			blogIdIndex: uniqueIndex('social_reactions_blog_id_idx').on(
				socialReactions.blogId
			)
		}
	}
)

// Schema for socialReactions - used to validate API requests
const baseSchema = createSelectSchema(socialReactions).omit(timestamps)

export const insertSocialReactionSchema =
	createInsertSchema(socialReactions).omit(timestamps)
export const insertSocialReactionParams = baseSchema
	.extend({
		blogId: z.coerce.string().min(1),
		socialIconId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateSocialReactionSchema = baseSchema
export const updateSocialReactionParams = baseSchema
	.extend({
		blogId: z.coerce.string().min(1),
		socialIconId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const socialReactionIdSchema = baseSchema.pick({ id: true })

// Types for socialReactions - used to type API request params and within Components
export type SocialReaction = typeof socialReactions.$inferSelect
export type NewSocialReaction = z.infer<typeof insertSocialReactionSchema>
export type NewSocialReactionParams = z.infer<typeof insertSocialReactionParams>
export type UpdateSocialReactionParams = z.infer<
	typeof updateSocialReactionParams
>
export type SocialReactionId = z.infer<typeof socialReactionIdSchema>['id']

// this type infers the return from getSocialReactions() - meaning it will include any joins
export type CompleteSocialReaction = Awaited<
	ReturnType<typeof getSocialReactions>
>['socialReactions'][number]
