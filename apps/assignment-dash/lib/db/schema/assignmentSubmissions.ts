import { sql } from 'drizzle-orm'
import {
	varchar,
	text,
	integer,
	boolean,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { assignments } from './assignments'
import { type getAssignmentSubmissions } from '@/lib/api/assignmentSubmissions/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const assignmentSubmissions = pgTable(
	'assignment_submissions',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		assignmentId: varchar('assignment_id', { length: 256 })
			.references(() => assignments.id)
			.notNull(),
		data1: text('data1'),
		data2: text('data2'),
		format: integer('format'),
		gradeId: varchar('grade_id', { length: 256 }),
		mailed: boolean('mailed'),
		numFiles: integer('num_files'),
		submissionComment: text('submission_comment'),
		teacherId: varchar('teacher_id', { length: 256 }),
		timeMarked: timestamp('time_marked'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(assignmentSubmissions) => {
		return {
			assignmentIdIndex: uniqueIndex('as_assignment_id_idx').on(
				assignmentSubmissions.assignmentId
			)
		}
	}
)

// Schema for assignmentSubmissions - used to validate API requests
const baseSchema = createSelectSchema(assignmentSubmissions).omit(timestamps)

export const insertAssignmentSubmissionSchema = createInsertSchema(
	assignmentSubmissions
).omit(timestamps)
export const insertAssignmentSubmissionParams = baseSchema
	.extend({
		assignmentId: z.coerce.string().min(1),
		format: z.coerce.number(),
		mailed: z.coerce.boolean(),
		numFiles: z.coerce.number(),
		timeMarked: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateAssignmentSubmissionSchema = baseSchema
export const updateAssignmentSubmissionParams = baseSchema
	.extend({
		assignmentId: z.coerce.string().min(1),
		format: z.coerce.number(),
		mailed: z.coerce.boolean(),
		numFiles: z.coerce.number(),
		timeMarked: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const assignmentSubmissionIdSchema = baseSchema.pick({ id: true })

// Types for assignmentSubmissions - used to type API request params and within Components
export type AssignmentSubmission = typeof assignmentSubmissions.$inferSelect
export type NewAssignmentSubmission = z.infer<
	typeof insertAssignmentSubmissionSchema
>
export type NewAssignmentSubmissionParams = z.infer<
	typeof insertAssignmentSubmissionParams
>
export type UpdateAssignmentSubmissionParams = z.infer<
	typeof updateAssignmentSubmissionParams
>
export type AssignmentSubmissionId = z.infer<
	typeof assignmentSubmissionIdSchema
>['id']

// this type infers the return from getAssignmentSubmissions() - meaning it will include any joins
export type CompleteAssignmentSubmission = Awaited<
	ReturnType<typeof getAssignmentSubmissions>
>['assignmentSubmissions'][number]
