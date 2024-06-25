import { sql } from 'drizzle-orm'
import {
	integer,
	varchar,
	boolean,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getReportbuilderFilters } from '@/lib/api/reportbuilderFilters/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const reportbuilderFilters = pgTable(
	'reportbuilder_filters',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		filterOrder: integer('filter_order'),
		heading: varchar('heading', { length: 256 }),
		isCondition: boolean('is_condition').default(false),
		reportId: varchar('report_id', { length: 256 }).notNull(),
		uniqueIdentifier: varchar('unique_identifier', { length: 256 }),
		userModified: varchar('user_modified', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(reportbuilderFilters) => {
		return {
			reportIdIndex: uniqueIndex('reportbuilder_filters_report_id_idx').on(
				reportbuilderFilters.reportId
			)
		}
	}
)

// Schema for reportbuilderFilters - used to validate API requests
const baseSchema = createSelectSchema(reportbuilderFilters).omit(timestamps)

export const insertReportbuilderFilterSchema =
	createInsertSchema(reportbuilderFilters).omit(timestamps)
export const insertReportbuilderFilterParams = baseSchema
	.extend({
		filterOrder: z.coerce.number(),
		isCondition: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateReportbuilderFilterSchema = baseSchema
export const updateReportbuilderFilterParams = baseSchema
	.extend({
		filterOrder: z.coerce.number(),
		isCondition: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const reportbuilderFilterIdSchema = baseSchema.pick({ id: true })

// Types for reportbuilderFilters - used to type API request params and within Components
export type ReportbuilderFilter = typeof reportbuilderFilters.$inferSelect
export type NewReportbuilderFilter = z.infer<
	typeof insertReportbuilderFilterSchema
>
export type NewReportbuilderFilterParams = z.infer<
	typeof insertReportbuilderFilterParams
>
export type UpdateReportbuilderFilterParams = z.infer<
	typeof updateReportbuilderFilterParams
>
export type ReportbuilderFilterId = z.infer<
	typeof reportbuilderFilterIdSchema
>['id']

// this type infers the return from getReportbuilderFilters() - meaning it will include any joins
export type CompleteReportbuilderFilter = Awaited<
	ReturnType<typeof getReportbuilderFilters>
>['reportbuilderFilters'][number]
