import { sql } from 'drizzle-orm'
import {
	varchar,
	text,
	date,
	boolean,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getCompetencyPlans } from '@/lib/api/competencyPlans/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const competencyPlans = pgTable('competency_plans', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	description: text('description'),
	descriptionFormat: varchar('description_format', { length: 256 }),
	dueDate: date('due_date'),
	origTemplateId: varchar('orig_template_id', { length: 256 }),
	reviewerId: varchar('reviewer_id', { length: 256 }),
	status: boolean('status'),
	templateId: varchar('template_id', { length: 256 }),
	userModified: varchar('user_id', { length: 256 }).notNull(),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for competencyPlans - used to validate API requests
const baseSchema = createSelectSchema(competencyPlans).omit(timestamps)

export const insertCompetencyPlanSchema =
	createInsertSchema(competencyPlans).omit(timestamps)
export const insertCompetencyPlanParams = baseSchema
	.extend({
		dueDate: z.coerce.string().min(1),
		status: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateCompetencyPlanSchema = baseSchema
export const updateCompetencyPlanParams = baseSchema
	.extend({
		dueDate: z.coerce.string().min(1),
		status: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const competencyPlanIdSchema = baseSchema.pick({ id: true })

// Types for competencyPlans - used to type API request params and within Components
export type CompetencyPlan = typeof competencyPlans.$inferSelect
export type NewCompetencyPlan = z.infer<typeof insertCompetencyPlanSchema>
export type NewCompetencyPlanParams = z.infer<typeof insertCompetencyPlanParams>
export type UpdateCompetencyPlanParams = z.infer<
	typeof updateCompetencyPlanParams
>
export type CompetencyPlanId = z.infer<typeof competencyPlanIdSchema>['id']

// this type infers the return from getCompetencyPlans() - meaning it will include any joins
export type CompleteCompetencyPlan = Awaited<
	ReturnType<typeof getCompetencyPlans>
>['competencyPlans'][number]
