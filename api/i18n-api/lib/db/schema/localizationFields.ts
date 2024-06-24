import { varchar, text, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getLocalizationFields } from '@/lib/api/localizationFields/queries'

import { nanoid } from '@/lib/utils'

export const localizationFields = pgTable('localization_fields', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	description: text('description'),
	defaultValue: varchar('default_value', { length: 256 })
})

// Schema for localizationFields - used to validate API requests
const baseSchema = createSelectSchema(localizationFields)

export const insertLocalizationFieldSchema =
	createInsertSchema(localizationFields)
export const insertLocalizationFieldParams = baseSchema.extend({}).omit({
	id: true
})

export const updateLocalizationFieldSchema = baseSchema
export const updateLocalizationFieldParams = baseSchema.extend({})
export const localizationFieldIdSchema = baseSchema.pick({ id: true })

// Types for localizationFields - used to type API request params and within Components
export type LocalizationField = typeof localizationFields.$inferSelect
export type NewLocalizationField = z.infer<typeof insertLocalizationFieldSchema>
export type NewLocalizationFieldParams = z.infer<
	typeof insertLocalizationFieldParams
>
export type UpdateLocalizationFieldParams = z.infer<
	typeof updateLocalizationFieldParams
>
export type LocalizationFieldId = z.infer<
	typeof localizationFieldIdSchema
>['id']

// this type infers the return from getLocalizationFields() - meaning it will include any joins
export type CompleteLocalizationField = Awaited<
	ReturnType<typeof getLocalizationFields>
>['localizationFields'][number]
