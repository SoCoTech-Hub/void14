import { varchar, integer, boolean, real, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { courses } from './courses'
import { type getCourseCompletionAggrMethds } from '@/lib/api/courseCompletionAggrMethds/queries'

import { nanoid } from '@/lib/utils'

export const courseCompletionAggrMethds = pgTable(
	'course_completion_aggr_methds',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		courseId: varchar('course_id', { length: 256 })
			.references(() => courses.id, { onDelete: 'cascade' })
			.notNull(),
		criteriaType: integer('criteria_type'),
		method: boolean('method'),
		value: real('value')
	}
)

// Schema for courseCompletionAggrMethds - used to validate API requests
const baseSchema = createSelectSchema(courseCompletionAggrMethds)

export const insertCourseCompletionAggrMethdSchema = createInsertSchema(
	courseCompletionAggrMethds
)
export const insertCourseCompletionAggrMethdParams = baseSchema
	.extend({
		courseId: z.coerce.string().min(1),
		criteriaType: z.coerce.number(),
		method: z.coerce.boolean(),
		value: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateCourseCompletionAggrMethdSchema = baseSchema
export const updateCourseCompletionAggrMethdParams = baseSchema.extend({
	courseId: z.coerce.string().min(1),
	criteriaType: z.coerce.number(),
	method: z.coerce.boolean(),
	value: z.coerce.number()
})
export const courseCompletionAggrMethdIdSchema = baseSchema.pick({ id: true })

// Types for courseCompletionAggrMethds - used to type API request params and within Components
export type CourseCompletionAggrMethd =
	typeof courseCompletionAggrMethds.$inferSelect
export type NewCourseCompletionAggrMethd = z.infer<
	typeof insertCourseCompletionAggrMethdSchema
>
export type NewCourseCompletionAggrMethdParams = z.infer<
	typeof insertCourseCompletionAggrMethdParams
>
export type UpdateCourseCompletionAggrMethdParams = z.infer<
	typeof updateCourseCompletionAggrMethdParams
>
export type CourseCompletionAggrMethdId = z.infer<
	typeof courseCompletionAggrMethdIdSchema
>['id']

// this type infers the return from getCourseCompletionAggrMethds() - meaning it will include any joins
export type CompleteCourseCompletionAggrMethd = Awaited<
	ReturnType<typeof getCourseCompletionAggrMethds>
>['courseCompletionAggrMethds'][number]
