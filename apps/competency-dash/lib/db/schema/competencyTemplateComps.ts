import { sql } from 'drizzle-orm'
import { varchar, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { competencies } from './competencies'
import { competencyTemplates } from './competencyTemplates'
import { type getCompetencyTemplateComps } from '@/lib/api/competencyTemplateComps/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const competencyTemplateComps = pgTable(
	'competency_template_comps',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		competencyId: varchar('competency_id', { length: 256 })
			.references(() => competencies.id, { onDelete: 'cascade' })
			.notNull(),
		competencyTemplateId: varchar('competency_template_id', { length: 256 })
			.references(() => competencyTemplates.id, { onDelete: 'cascade' })
			.notNull(),
		sortOrder: integer('sort_order'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(competencyTemplateComps) => {
		return {
			sortOrderIndex: uniqueIndex('sort_order_idx').on(
				competencyTemplateComps.sortOrder
			)
		}
	}
)

// Schema for competencyTemplateComps - used to validate API requests
const baseSchema = createSelectSchema(competencyTemplateComps).omit(timestamps)

export const insertCompetencyTemplateCompSchema = createInsertSchema(
	competencyTemplateComps
).omit(timestamps)
export const insertCompetencyTemplateCompParams = baseSchema
	.extend({
		competencyId: z.coerce.string().min(1),
		competencyTemplateId: z.coerce.string().min(1),
		sortOrder: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateCompetencyTemplateCompSchema = baseSchema
export const updateCompetencyTemplateCompParams = baseSchema
	.extend({
		competencyId: z.coerce.string().min(1),
		competencyTemplateId: z.coerce.string().min(1),
		sortOrder: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const competencyTemplateCompIdSchema = baseSchema.pick({ id: true })

// Types for competencyTemplateComps - used to type API request params and within Components
export type CompetencyTemplateComp = typeof competencyTemplateComps.$inferSelect
export type NewCompetencyTemplateComp = z.infer<
	typeof insertCompetencyTemplateCompSchema
>
export type NewCompetencyTemplateCompParams = z.infer<
	typeof insertCompetencyTemplateCompParams
>
export type UpdateCompetencyTemplateCompParams = z.infer<
	typeof updateCompetencyTemplateCompParams
>
export type CompetencyTemplateCompId = z.infer<
	typeof competencyTemplateCompIdSchema
>['id']

// this type infers the return from getCompetencyTemplateComps() - meaning it will include any joins
export type CompleteCompetencyTemplateComp = Awaited<
	ReturnType<typeof getCompetencyTemplateComps>
>['competencyTemplateComps'][number]
