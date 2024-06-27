import { timestamp, real, boolean, varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { lessons } from './lessons'
import { type getLessonGrades } from '@/lib/api/lessonGrades/queries'

import { nanoid } from '@/lib/utils'

export const lessonGrades = pgTable('lesson_grades', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	completed: timestamp('completed'),
	grade: real('grade'),
	late: boolean('late'),
	lessonId: varchar('lesson_id', { length: 256 })
		.references(() => lessons.id, { onDelete: 'cascade' })
		.notNull(),
	userId: varchar('user_id', { length: 256 }).notNull()
})

// Schema for lessonGrades - used to validate API requests
const baseSchema = createSelectSchema(lessonGrades)

export const insertLessonGradeSchema = createInsertSchema(lessonGrades)
export const insertLessonGradeParams = baseSchema
	.extend({
		completed: z.coerce.string().min(1),
		grade: z.coerce.number(),
		late: z.coerce.boolean(),
		lessonId: z.coerce.string().min(1)
	})
	.omit({
		id: true,
		userId: true
	})

export const updateLessonGradeSchema = baseSchema
export const updateLessonGradeParams = baseSchema
	.extend({
		completed: z.coerce.string().min(1),
		grade: z.coerce.number(),
		late: z.coerce.boolean(),
		lessonId: z.coerce.string().min(1)
	})
	.omit({
		userId: true
	})
export const lessonGradeIdSchema = baseSchema.pick({ id: true })

// Types for lessonGrades - used to type API request params and within Components
export type LessonGrade = typeof lessonGrades.$inferSelect
export type NewLessonGrade = z.infer<typeof insertLessonGradeSchema>
export type NewLessonGradeParams = z.infer<typeof insertLessonGradeParams>
export type UpdateLessonGradeParams = z.infer<typeof updateLessonGradeParams>
export type LessonGradeId = z.infer<typeof lessonGradeIdSchema>['id']

// this type infers the return from getLessonGrades() - meaning it will include any joins
export type CompleteLessonGrade = Awaited<
	ReturnType<typeof getLessonGrades>
>['lessonGrades'][number]
