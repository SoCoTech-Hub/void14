import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { feedbacks } from './feedbacks'
import { type getFeedbackSitecourseMaps } from '@/lib/api/feedbackSitecourseMaps/queries'

import { nanoid } from '@/lib/utils'

export const feedbackSitecourseMaps = pgTable('feedback_sitecourse_maps', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	courseId: varchar('course_id', { length: 256 }),
	feedbackId: varchar('feedback_id', { length: 256 })
		.references(() => feedbacks.id, { onDelete: 'cascade' })
		.notNull()
})

// Schema for feedbackSitecourseMaps - used to validate API requests
const baseSchema = createSelectSchema(feedbackSitecourseMaps)

export const insertFeedbackSitecourseMapSchema = createInsertSchema(
	feedbackSitecourseMaps
)
export const insertFeedbackSitecourseMapParams = baseSchema
	.extend({
		feedbackId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateFeedbackSitecourseMapSchema = baseSchema
export const updateFeedbackSitecourseMapParams = baseSchema.extend({
	feedbackId: z.coerce.string().min(1)
})
export const feedbackSitecourseMapIdSchema = baseSchema.pick({ id: true })

// Types for feedbackSitecourseMaps - used to type API request params and within Components
export type FeedbackSitecourseMap = typeof feedbackSitecourseMaps.$inferSelect
export type NewFeedbackSitecourseMap = z.infer<
	typeof insertFeedbackSitecourseMapSchema
>
export type NewFeedbackSitecourseMapParams = z.infer<
	typeof insertFeedbackSitecourseMapParams
>
export type UpdateFeedbackSitecourseMapParams = z.infer<
	typeof updateFeedbackSitecourseMapParams
>
export type FeedbackSitecourseMapId = z.infer<
	typeof feedbackSitecourseMapIdSchema
>['id']

// this type infers the return from getFeedbackSitecourseMaps() - meaning it will include any joins
export type CompleteFeedbackSitecourseMap = Awaited<
	ReturnType<typeof getFeedbackSitecourseMaps>
>['feedbackSitecourseMaps'][number]
