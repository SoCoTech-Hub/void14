import { timestamp, varchar, boolean, text, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { courses } from './courses'
import { type getCourseCompletionDefaults } from '@/lib/api/courseCompletionDefaults/queries'

import { nanoid } from '@/lib/utils'

export const courseCompletionDefaults = pgTable(
	'course_completion_defaults',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		completionExpectedDate: timestamp('completion_expected_date'),
		courseId: varchar('course_id', { length: 256 })
			.references(() => courses.id)
			.notNull(),
		moduleId: varchar('module_id', { length: 256 }),
		completion: boolean('completion'),
		completionPassGrade: boolean('completion_pass_grade'),
		completionUseGrade: boolean('completion_use_grade'),
		completionView: boolean('completion_view'),
		customRules: text('custom_rules')
	},
	(courseCompletionDefaults) => {
		return {
			courseIdIndex: uniqueIndex('course_id_idx').on(
				courseCompletionDefaults.courseId
			)
		}
	}
)

// Schema for courseCompletionDefaults - used to validate API requests
const baseSchema = createSelectSchema(courseCompletionDefaults)

export const insertCourseCompletionDefaultSchema = createInsertSchema(
	courseCompletionDefaults
)
export const insertCourseCompletionDefaultParams = baseSchema
	.extend({
		completionExpectedDate: z.coerce.string().min(1),
		courseId: z.coerce.string().min(1),
		completion: z.coerce.boolean(),
		completionPassGrade: z.coerce.boolean(),
		completionUseGrade: z.coerce.boolean(),
		completionView: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateCourseCompletionDefaultSchema = baseSchema
export const updateCourseCompletionDefaultParams = baseSchema.extend({
	completionExpectedDate: z.coerce.string().min(1),
	courseId: z.coerce.string().min(1),
	completion: z.coerce.boolean(),
	completionPassGrade: z.coerce.boolean(),
	completionUseGrade: z.coerce.boolean(),
	completionView: z.coerce.boolean()
})
export const courseCompletionDefaultIdSchema = baseSchema.pick({ id: true })

// Types for courseCompletionDefaults - used to type API request params and within Components
export type CourseCompletionDefault =
	typeof courseCompletionDefaults.$inferSelect
export type NewCourseCompletionDefault = z.infer<
	typeof insertCourseCompletionDefaultSchema
>
export type NewCourseCompletionDefaultParams = z.infer<
	typeof insertCourseCompletionDefaultParams
>
export type UpdateCourseCompletionDefaultParams = z.infer<
	typeof updateCourseCompletionDefaultParams
>
export type CourseCompletionDefaultId = z.infer<
	typeof courseCompletionDefaultIdSchema
>['id']

// this type infers the return from getCourseCompletionDefaults() - meaning it will include any joins
export type CompleteCourseCompletionDefault = Awaited<
	ReturnType<typeof getCourseCompletionDefaults>
>['courseCompletionDefaults'][number]
