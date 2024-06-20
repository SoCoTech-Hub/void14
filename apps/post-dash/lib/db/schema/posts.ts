import { sql } from 'drizzle-orm'
import { varchar, text, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getPosts } from '@/lib/api/posts/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const posts = pgTable(
	'posts',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		attachment: varchar('attachment', { length: 256 }),
		content: text('content'),
		courseId: varchar('course_id', { length: 256 }),
		courseModuleId: varchar('course_module_id', { length: 256 }),
		format: integer('format'),
		groupId: varchar('group_id', { length: 256 }),
		module: varchar('module', { length: 256 }),
		moduleId: varchar('module_id', { length: 256 }),
		publishState: varchar('publish_state', { length: 256 }),
		rating: integer('rating'),
		subject: varchar('subject', { length: 256 }),
		summary: text('summary'),
		summaryFormat: integer('summary_format'),
		uniqueHash: varchar('unique_hash', { length: 256 }),
		userModified: varchar('user_modified', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(posts) => {
		return {
			courseIdIndex: uniqueIndex('course_id_idx').on(posts.courseId)
		}
	}
)

// Schema for posts - used to validate API requests
const baseSchema = createSelectSchema(posts).omit(timestamps)

export const insertPostSchema = createInsertSchema(posts).omit(timestamps)
export const insertPostParams = baseSchema
	.extend({
		format: z.coerce.number(),
		rating: z.coerce.number(),
		summaryFormat: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updatePostSchema = baseSchema
export const updatePostParams = baseSchema
	.extend({
		format: z.coerce.number(),
		rating: z.coerce.number(),
		summaryFormat: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const postIdSchema = baseSchema.pick({ id: true })

// Types for posts - used to type API request params and within Components
export type Post = typeof posts.$inferSelect
export type NewPost = z.infer<typeof insertPostSchema>
export type NewPostParams = z.infer<typeof insertPostParams>
export type UpdatePostParams = z.infer<typeof updatePostParams>
export type PostId = z.infer<typeof postIdSchema>['id']

// this type infers the return from getPosts() - meaning it will include any joins
export type CompletePost = Awaited<ReturnType<typeof getPosts>>['posts'][number]
