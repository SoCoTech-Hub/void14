import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { gradeOutcomes } from './gradeOutcomes'
import { type getGradeOutcomesCourses } from '@/lib/api/gradeOutcomesCourses/queries'

import { nanoid } from '@/lib/utils'

export const gradeOutcomesCourses = pgTable('grade_outcomes_courses', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	gradeOutcomeId: varchar('grade_outcome_id', { length: 256 })
		.references(() => gradeOutcomes.id, { onDelete: 'cascade' })
		.notNull(),
	courseId: varchar('course_id', { length: 256 })
})

// Schema for gradeOutcomesCourses - used to validate API requests
const baseSchema = createSelectSchema(gradeOutcomesCourses)

export const insertGradeOutcomesCourseSchema =
	createInsertSchema(gradeOutcomesCourses)
export const insertGradeOutcomesCourseParams = baseSchema
	.extend({
		gradeOutcomeId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateGradeOutcomesCourseSchema = baseSchema
export const updateGradeOutcomesCourseParams = baseSchema.extend({
	gradeOutcomeId: z.coerce.string().min(1)
})
export const gradeOutcomesCourseIdSchema = baseSchema.pick({ id: true })

// Types for gradeOutcomesCourses - used to type API request params and within Components
export type GradeOutcomesCourse = typeof gradeOutcomesCourses.$inferSelect
export type NewGradeOutcomesCourse = z.infer<
	typeof insertGradeOutcomesCourseSchema
>
export type NewGradeOutcomesCourseParams = z.infer<
	typeof insertGradeOutcomesCourseParams
>
export type UpdateGradeOutcomesCourseParams = z.infer<
	typeof updateGradeOutcomesCourseParams
>
export type GradeOutcomesCourseId = z.infer<
	typeof gradeOutcomesCourseIdSchema
>['id']

// this type infers the return from getGradeOutcomesCourses() - meaning it will include any joins
export type CompleteGradeOutcomesCourse = Awaited<
	ReturnType<typeof getGradeOutcomesCourses>
>['gradeOutcomesCourses'][number]
