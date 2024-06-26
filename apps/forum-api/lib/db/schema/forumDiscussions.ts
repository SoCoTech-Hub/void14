import { sql } from 'drizzle-orm'
import { boolean, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getForumDiscussions } from '@/lib/api/forumDiscussions/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const forumDiscussions = pgTable('forum_discussions', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	assessed: boolean('assessed'),
	course: varchar('course', { length: 256 }),
	firstPost: varchar('first_post', { length: 256 }),
	forum: varchar('forum', { length: 256 }),
	groupId: varchar('group_id', { length: 256 }),
	name: varchar('name', { length: 256 }),
	pinned: boolean('pinned'),
	timeEnd: timestamp('time_end'),
	timeLocked: timestamp('time_locked'),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for forumDiscussions - used to validate API requests
const baseSchema = createSelectSchema(forumDiscussions).omit(timestamps)

export const insertForumDiscussionSchema =
	createInsertSchema(forumDiscussions).omit(timestamps)
export const insertForumDiscussionParams = baseSchema
	.extend({
		assessed: z.coerce.boolean(),
		pinned: z.coerce.boolean(),
		timeEnd: z.coerce.string().min(1),
		timeLocked: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateForumDiscussionSchema = baseSchema
export const updateForumDiscussionParams = baseSchema
	.extend({
		assessed: z.coerce.boolean(),
		pinned: z.coerce.boolean(),
		timeEnd: z.coerce.string().min(1),
		timeLocked: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const forumDiscussionIdSchema = baseSchema.pick({ id: true })

// Types for forumDiscussions - used to type API request params and within Components
export type ForumDiscussion = typeof forumDiscussions.$inferSelect
export type NewForumDiscussion = z.infer<typeof insertForumDiscussionSchema>
export type NewForumDiscussionParams = z.infer<
	typeof insertForumDiscussionParams
>
export type UpdateForumDiscussionParams = z.infer<
	typeof updateForumDiscussionParams
>
export type ForumDiscussionId = z.infer<typeof forumDiscussionIdSchema>['id']

// this type infers the return from getForumDiscussions() - meaning it will include any joins
export type CompleteForumDiscussion = Awaited<
	ReturnType<typeof getForumDiscussions>
>['forumDiscussions'][number]
