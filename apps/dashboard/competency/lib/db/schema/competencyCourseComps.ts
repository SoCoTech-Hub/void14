import { sql } from 'drizzle-orm'
import {
	varchar,
	integer,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { competencies } from './competencies'
import { type getCompetencyCourseComps } from '@/lib/api/competencyCourseComps/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const competencyCourseComps = pgTable(
	'competency_course_comps',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		competencyId: varchar('competency_id', { length: 256 })
			.references(() => competencies.id, { onDelete: 'cascade' })
			.notNull(),
		courseId: varchar('course_id', { length: 256 }),
		ruleOutcome: varchar('rule_outcome', { length: 256 }),
		sortOrder: integer('sort_order'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(competencyCourseComps) => {
		return {
			sortOrderIndex: uniqueIndex('sort_order_idx').on(
				competencyCourseComps.sortOrder
			)
		}
	}
)

// Schema for competencyCourseComps - used to validate API requests
const baseSchema = createSelectSchema(competencyCourseComps).omit(timestamps)

export const insertCompetencyCourseCompSchema = createInsertSchema(
	competencyCourseComps
).omit(timestamps)
export const insertCompetencyCourseCompParams = baseSchema
	.extend({
		competencyId: z.coerce.string().min(1),
		sortOrder: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateCompetencyCourseCompSchema = baseSchema
export const updateCompetencyCourseCompParams = baseSchema
	.extend({
		competencyId: z.coerce.string().min(1),
		sortOrder: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const competencyCourseCompIdSchema = baseSchema.pick({ id: true })

// Types for competencyCourseComps - used to type API request params and within Components
export type CompetencyCourseComp = typeof competencyCourseComps.$inferSelect
export type NewCompetencyCourseComp = z.infer<
	typeof insertCompetencyCourseCompSchema
>
export type NewCompetencyCourseCompParams = z.infer<
	typeof insertCompetencyCourseCompParams
>
export type UpdateCompetencyCourseCompParams = z.infer<
	typeof updateCompetencyCourseCompParams
>
export type CompetencyCourseCompId = z.infer<
	typeof competencyCourseCompIdSchema
>['id']

// this type infers the return from getCompetencyCourseComps() - meaning it will include any joins
export type CompleteCompetencyCourseComp = Awaited<
	ReturnType<typeof getCompetencyCourseComps>
>['competencyCourseComps'][number]
