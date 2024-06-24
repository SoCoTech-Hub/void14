import { sql } from 'drizzle-orm'
import {
	varchar,
	text,
	integer,
	boolean,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getReportbuilderReports } from '@/lib/api/reportbuilderReports/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const reportbuilderReports = pgTable(
	'reportbuilder_reports',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		area: varchar('area', { length: 256 }),
		component: varchar('component', { length: 256 }),
		conditionData: text('condition_data'),
		contextId: varchar('context_id', { length: 256 }).notNull(),
		itemId: varchar('item_id', { length: 256 }),
		name: varchar('name', { length: 256 }),
		settingsData: text('settings_data'),
		source: varchar('source', { length: 256 }),
		type: integer('type'),
		uniqueRows: boolean('unique_rows').default(false),
		userModified: varchar('user_modified', { length: 256 }).notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),
		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(reportbuilderReports) => {
		return {
			contextIdIndex: uniqueIndex('context_id_idx').on(
				reportbuilderReports.contextId
			)
		}
	}
)

// Schema for reportbuilderReports - used to validate API requests
const baseSchema = createSelectSchema(reportbuilderReports).omit(timestamps)

export const insertReportbuilderReportSchema =
	createInsertSchema(reportbuilderReports).omit(timestamps)
export const insertReportbuilderReportParams = baseSchema
	.extend({
		type: z.coerce.number(),
		uniqueRows: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateReportbuilderReportSchema = baseSchema
export const updateReportbuilderReportParams = baseSchema
	.extend({
		type: z.coerce.number(),
		uniqueRows: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const reportbuilderReportIdSchema = baseSchema.pick({ id: true })

// Types for reportbuilderReports - used to type API request params and within Components
export type ReportbuilderReport = typeof reportbuilderReports.$inferSelect
export type NewReportbuilderReport = z.infer<
	typeof insertReportbuilderReportSchema
>
export type NewReportbuilderReportParams = z.infer<
	typeof insertReportbuilderReportParams
>
export type UpdateReportbuilderReportParams = z.infer<
	typeof updateReportbuilderReportParams
>
export type ReportbuilderReportId = z.infer<
	typeof reportbuilderReportIdSchema
>['id']

// this type infers the return from getReportbuilderReports() - meaning it will include any joins
export type CompleteReportbuilderReport = Awaited<
	ReturnType<typeof getReportbuilderReports>
>['reportbuilderReports'][number]
