import { sql } from 'drizzle-orm'
import {
	varchar,
	integer,
	real,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { assignments } from './assignments'
import { type getAssignGrades } from '@/lib/api/assignGrades/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const assignGrades = pgTable(
	'assign_grades',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		assignmentId: varchar('assignment_id', { length: 256 })
			.references(() => assignments.id)
			.notNull(),
		attemptNumber: integer('attempt_number'),
		grade: real('grade'),
		graderId: varchar('grader_id', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),
		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(assignGrades) => {
		return {
			assignmentIdIndex: uniqueIndex('ag_assignment_id_idx').on(
				assignGrades.assignmentId
			)
		}
	}
)

// Schema for assignGrades - used to validate API requests
const baseSchema = createSelectSchema(assignGrades).omit(timestamps)

export const insertAssignGradeSchema =
	createInsertSchema(assignGrades).omit(timestamps)
export const insertAssignGradeParams = baseSchema
	.extend({
		assignmentId: z.coerce.string().min(1),
		attemptNumber: z.coerce.number(),
		grade: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateAssignGradeSchema = baseSchema
export const updateAssignGradeParams = baseSchema
	.extend({
		assignmentId: z.coerce.string().min(1),
		attemptNumber: z.coerce.number(),
		grade: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const assignGradeIdSchema = baseSchema.pick({ id: true })

// Types for assignGrades - used to type API request params and within Components
export type AssignGrade = typeof assignGrades.$inferSelect
export type NewAssignGrade = z.infer<typeof insertAssignGradeSchema>
export type NewAssignGradeParams = z.infer<typeof insertAssignGradeParams>
export type UpdateAssignGradeParams = z.infer<typeof updateAssignGradeParams>
export type AssignGradeId = z.infer<typeof assignGradeIdSchema>['id']

// this type infers the return from getAssignGrades() - meaning it will include any joins
export type CompleteAssignGrade = Awaited<
	ReturnType<typeof getAssignGrades>
>['assignGrades'][number]
