import { sql } from 'drizzle-orm'
import {
	varchar,
	timestamp,
	integer,
	date,
	boolean,
	text,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getForums } from '@/lib/api/forums/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const forums = pgTable('forums', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	assessed: varchar('assessed', { length: 256 }),
	assessTimeFinish: timestamp('assess_time_finish'),
	assessTimeStart: timestamp('assess_time_start'),
	blockAfter: integer('block_after'),
	blockPeriod: integer('block_period'),
	course: varchar('course', { length: 256 }),
	completionDiscussions: integer('completion_discussions'),
	completionPosts: integer('completion_posts'),
	completionReplies: integer('completion_replies'),
	cutOffDate: date('cut_off_date'),
	displayWordCount: boolean('display_word_count'),
	dueDate: date('due_date'),
	forceSubscribe: boolean('force_subscribe'),
	gradeForum: integer('grade_forum'),
	gradeForumNotify: integer('grade_forum_notify'),
	intro: text('intro'),
	introFormat: integer('intro_format'),
	lockDiscussionAfter: timestamp('lock_discussion_after'),
	maxAttachments: integer('max_attachments'),
	maxBytes: integer('max_bytes'),
	name: varchar('name', { length: 256 }),
	rssArticles: integer('rss_articles'),
	rssType: integer('rss_type'),
	scale: integer('scale'),
	trackingType: integer('tracking_type'),
	type: varchar('type', { length: 256 }),
	warnAfter: integer('warn_after'),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for forums - used to validate API requests
const baseSchema = createSelectSchema(forums).omit(timestamps)

export const insertForumSchema = createInsertSchema(forums).omit(timestamps)
export const insertForumParams = baseSchema
	.extend({
		assessTimeFinish: z.coerce.string().min(1),
		assessTimeStart: z.coerce.string().min(1),
		blockAfter: z.coerce.number(),
		blockPeriod: z.coerce.number(),
		completionDiscussions: z.coerce.number(),
		completionPosts: z.coerce.number(),
		completionReplies: z.coerce.number(),
		cutOffDate: z.coerce.string().min(1),
		displayWordCount: z.coerce.boolean(),
		dueDate: z.coerce.string().min(1),
		forceSubscribe: z.coerce.boolean(),
		gradeForum: z.coerce.number(),
		gradeForumNotify: z.coerce.number(),
		introFormat: z.coerce.number(),
		lockDiscussionAfter: z.coerce.string().min(1),
		maxAttachments: z.coerce.number(),
		maxBytes: z.coerce.number(),
		rssArticles: z.coerce.number(),
		rssType: z.coerce.number(),
		scale: z.coerce.number(),
		trackingType: z.coerce.number(),
		warnAfter: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateForumSchema = baseSchema
export const updateForumParams = baseSchema.extend({
	assessTimeFinish: z.coerce.string().min(1),
	assessTimeStart: z.coerce.string().min(1),
	blockAfter: z.coerce.number(),
	blockPeriod: z.coerce.number(),
	completionDiscussions: z.coerce.number(),
	completionPosts: z.coerce.number(),
	completionReplies: z.coerce.number(),
	cutOffDate: z.coerce.string().min(1),
	displayWordCount: z.coerce.boolean(),
	dueDate: z.coerce.string().min(1),
	forceSubscribe: z.coerce.boolean(),
	gradeForum: z.coerce.number(),
	gradeForumNotify: z.coerce.number(),
	introFormat: z.coerce.number(),
	lockDiscussionAfter: z.coerce.string().min(1),
	maxAttachments: z.coerce.number(),
	maxBytes: z.coerce.number(),
	rssArticles: z.coerce.number(),
	rssType: z.coerce.number(),
	scale: z.coerce.number(),
	trackingType: z.coerce.number(),
	warnAfter: z.coerce.number()
})
export const forumIdSchema = baseSchema.pick({ id: true })

// Types for forums - used to type API request params and within Components
export type Forum = typeof forums.$inferSelect
export type NewForum = z.infer<typeof insertForumSchema>
export type NewForumParams = z.infer<typeof insertForumParams>
export type UpdateForumParams = z.infer<typeof updateForumParams>
export type ForumId = z.infer<typeof forumIdSchema>['id']

// this type infers the return from getForums() - meaning it will include any joins
export type CompleteForum = Awaited<
	ReturnType<typeof getForums>
>['forums'][number]
