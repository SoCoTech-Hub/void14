import { varchar, integer, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getForumDiscussionSubs } from '@/lib/api/forumDiscussionSubs/queries'

import { nanoid } from '@/lib/utils'

export const forumDiscussionSubs = pgTable('forum_discussion_subs', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	discussion: varchar('discussion', { length: 256 }),
	forum: varchar('forum', { length: 256 }),
	preference: integer('preference'),
	userId: varchar('user_id', { length: 256 }).notNull()
})

// Schema for forumDiscussionSubs - used to validate API requests
const baseSchema = createSelectSchema(forumDiscussionSubs)

export const insertForumDiscussionSubSchema =
	createInsertSchema(forumDiscussionSubs)
export const insertForumDiscussionSubParams = baseSchema
	.extend({
		preference: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateForumDiscussionSubSchema = baseSchema
export const updateForumDiscussionSubParams = baseSchema
	.extend({
		preference: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const forumDiscussionSubIdSchema = baseSchema.pick({ id: true })

// Types for forumDiscussionSubs - used to type API request params and within Components
export type ForumDiscussionSub = typeof forumDiscussionSubs.$inferSelect
export type NewForumDiscussionSub = z.infer<
	typeof insertForumDiscussionSubSchema
>
export type NewForumDiscussionSubParams = z.infer<
	typeof insertForumDiscussionSubParams
>
export type UpdateForumDiscussionSubParams = z.infer<
	typeof updateForumDiscussionSubParams
>
export type ForumDiscussionSubId = z.infer<
	typeof forumDiscussionSubIdSchema
>['id']

// this type infers the return from getForumDiscussionSubs() - meaning it will include any joins
export type CompleteForumDiscussionSub = Awaited<
	ReturnType<typeof getForumDiscussionSubs>
>['forumDiscussionSubs'][number]
