import { text, varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { fields } from './fields'
import { dataRecords } from './dataRecords'
import { type getDataContents } from '@/lib/api/dataContents/queries'

import { nanoid } from '@/lib/utils'

export const dataContents = pgTable('data_contents', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	content: text('content'),
	content1: text('content1'),
	content2: text('content2'),
	content3: text('content3'),
	content4: text('content4'),
	fieldId: varchar('field_id', { length: 256 })
		.references(() => fields.id, { onDelete: 'cascade' })
		.notNull(),
	dataRecordId: varchar('data_record_id', { length: 256 })
		.references(() => dataRecords.id, { onDelete: 'cascade' })
		.notNull()
})

// Schema for dataContents - used to validate API requests
const baseSchema = createSelectSchema(dataContents)

export const insertDataContentSchema = createInsertSchema(dataContents)
export const insertDataContentParams = baseSchema
	.extend({
		fieldId: z.coerce.string().min(1),
		dataRecordId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateDataContentSchema = baseSchema
export const updateDataContentParams = baseSchema.extend({
	fieldId: z.coerce.string().min(1),
	dataRecordId: z.coerce.string().min(1)
})
export const dataContentIdSchema = baseSchema.pick({ id: true })

// Types for dataContents - used to type API request params and within Components
export type DataContent = typeof dataContents.$inferSelect
export type NewDataContent = z.infer<typeof insertDataContentSchema>
export type NewDataContentParams = z.infer<typeof insertDataContentParams>
export type UpdateDataContentParams = z.infer<typeof updateDataContentParams>
export type DataContentId = z.infer<typeof dataContentIdSchema>['id']

// this type infers the return from getDataContents() - meaning it will include any joins
export type CompleteDataContent = Awaited<
	ReturnType<typeof getDataContents>
>['dataContents'][number]
