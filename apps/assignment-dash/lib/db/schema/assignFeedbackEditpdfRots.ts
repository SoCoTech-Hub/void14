import { integer, varchar, boolean, text, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getAssignFeedbackEditpdfRots } from '@/lib/api/assignFeedbackEditpdfRots/queries'

import { nanoid } from '@/lib/utils'

export const assignFeedbackEditpdfRots = pgTable(
	'assign_feedback_editpdf_rots',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		degree: integer('degree'),
		gradeId: varchar('grade_id', { length: 256 }),
		isRotated: boolean('is_rotated'),
		pageNo: integer('page_no'),
		pathNameHash: text('path_name_hash')
	}
)

// Schema for assignFeedbackEditpdfRots - used to validate API requests
const baseSchema = createSelectSchema(assignFeedbackEditpdfRots)

export const insertAssignFeedbackEditpdfRotSchema = createInsertSchema(
	assignFeedbackEditpdfRots
)
export const insertAssignFeedbackEditpdfRotParams = baseSchema
	.extend({
		degree: z.coerce.number(),
		isRotated: z.coerce.boolean(),
		pageNo: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateAssignFeedbackEditpdfRotSchema = baseSchema
export const updateAssignFeedbackEditpdfRotParams = baseSchema.extend({
	degree: z.coerce.number(),
	isRotated: z.coerce.boolean(),
	pageNo: z.coerce.number()
})
export const assignFeedbackEditpdfRotIdSchema = baseSchema.pick({ id: true })

// Types for assignFeedbackEditpdfRots - used to type API request params and within Components
export type AssignFeedbackEditpdfRot =
	typeof assignFeedbackEditpdfRots.$inferSelect
export type NewAssignFeedbackEditpdfRot = z.infer<
	typeof insertAssignFeedbackEditpdfRotSchema
>
export type NewAssignFeedbackEditpdfRotParams = z.infer<
	typeof insertAssignFeedbackEditpdfRotParams
>
export type UpdateAssignFeedbackEditpdfRotParams = z.infer<
	typeof updateAssignFeedbackEditpdfRotParams
>
export type AssignFeedbackEditpdfRotId = z.infer<
	typeof assignFeedbackEditpdfRotIdSchema
>['id']

// this type infers the return from getAssignFeedbackEditpdfRots() - meaning it will include any joins
export type CompleteAssignFeedbackEditpdfRot = Awaited<
	ReturnType<typeof getAssignFeedbackEditpdfRots>
>['assignFeedbackEditpdfRots'][number]
