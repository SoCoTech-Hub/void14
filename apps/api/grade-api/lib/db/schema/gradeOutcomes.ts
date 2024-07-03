import { sql } from 'drizzle-orm'
import { varchar, text, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getGradeOutcomes } from '@/lib/api/gradeOutcomes/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const gradeOutcomes = pgTable('grade_outcomes', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	courseId: varchar('course_id', { length: 256 }),
	description: text('description'),
	descriptionFormat: integer('description_format'),
	fullName: text('full_name'),
	scaleId: varchar('scale_id', { length: 256 }),
	shortName: varchar('short_name', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for gradeOutcomes - used to validate API requests
const baseSchema = createSelectSchema(gradeOutcomes).omit(timestamps)

export const insertGradeOutcomeSchema =
	createInsertSchema(gradeOutcomes).omit(timestamps)
export const insertGradeOutcomeParams = baseSchema
	.extend({
		descriptionFormat: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateGradeOutcomeSchema = baseSchema
export const updateGradeOutcomeParams = baseSchema
	.extend({
		descriptionFormat: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const gradeOutcomeIdSchema = baseSchema.pick({ id: true })

// Types for gradeOutcomes - used to type API request params and within Components
export type GradeOutcome = typeof gradeOutcomes.$inferSelect
export type NewGradeOutcome = z.infer<typeof insertGradeOutcomeSchema>
export type NewGradeOutcomeParams = z.infer<typeof insertGradeOutcomeParams>
export type UpdateGradeOutcomeParams = z.infer<typeof updateGradeOutcomeParams>
export type GradeOutcomeId = z.infer<typeof gradeOutcomeIdSchema>['id']

// this type infers the return from getGradeOutcomes() - meaning it will include any joins
export type CompleteGradeOutcome = Awaited<
	ReturnType<typeof getGradeOutcomes>
>['gradeOutcomes'][number]
