import { sql } from 'drizzle-orm'
import {
	varchar,
	integer,
	text,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { assignments } from './assignments'
import { type getAssignFeedbackComments } from '@/lib/api/assignFeedbackComments/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const assignFeedbackComments = pgTable(
	'assign_feedback_comments',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		assignmentId: varchar('assignment_id', { length: 256 })
			.references(() => assignments.id)
			.notNull(),
		commentFormat: integer('comment_format'),
		commentText: text('comment_text'),
		gradeId: varchar('grade_id', { length: 256 }),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(assignFeedbackComments) => {
		return {
			assignmentIdIndex: uniqueIndex('assignment_id_idx').on(
				assignFeedbackComments.assignmentId
			)
		}
	}
)

// Schema for assignFeedbackComments - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackComments).omit(timestamps)

export const insertAssignFeedbackCommentSchema = createInsertSchema(
	assignFeedbackComments
).omit(timestamps)
export const insertAssignFeedbackCommentParams = baseSchema
	.extend({
		assignmentId: z.coerce.string().min(1),
		commentFormat: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateAssignFeedbackCommentSchema = baseSchema
export const updateAssignFeedbackCommentParams = baseSchema.extend({
	assignmentId: z.coerce.string().min(1),
	commentFormat: z.coerce.number()
})
export const assignFeedbackCommentIdSchema = baseSchema.pick({ id: true })

// Types for assignFeedbackComments - used to type API request params and within Components
export type AssignFeedbackComment = typeof assignFeedbackComments.$inferSelect
export type NewAssignFeedbackComment = z.infer<
	typeof insertAssignFeedbackCommentSchema
>
export type NewAssignFeedbackCommentParams = z.infer<
	typeof insertAssignFeedbackCommentParams
>
export type UpdateAssignFeedbackCommentParams = z.infer<
	typeof updateAssignFeedbackCommentParams
>
export type AssignFeedbackCommentId = z.infer<
	typeof assignFeedbackCommentIdSchema
>['id']

// this type infers the return from getAssignFeedbackComments() - meaning it will include any joins
export type CompleteAssignFeedbackComment = Awaited<
	ReturnType<typeof getAssignFeedbackComments>
>['assignFeedbackComments'][number]
