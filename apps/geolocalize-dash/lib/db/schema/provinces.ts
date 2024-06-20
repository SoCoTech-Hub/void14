import { varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { countries } from './countries'
import { type getProvinces } from '@/lib/api/provinces/queries'

import { nanoid } from '@/lib/utils'

export const provinces = pgTable('provinces', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: varchar('name', { length: 256 }).notNull(),
	countryId: varchar('country_id', { length: 256 })
		.references(() => countries.id, { onDelete: 'cascade' })
		.notNull()
})

// Schema for provinces - used to validate API requests
const baseSchema = createSelectSchema(provinces)

export const insertProvinceSchema = createInsertSchema(provinces)
export const insertProvinceParams = baseSchema
	.extend({
		countryId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateProvinceSchema = baseSchema
export const updateProvinceParams = baseSchema.extend({
	countryId: z.coerce.string().min(1)
})
export const provinceIdSchema = baseSchema.pick({ id: true })

// Types for provinces - used to type API request params and within Components
export type Province = typeof provinces.$inferSelect
export type NewProvince = z.infer<typeof insertProvinceSchema>
export type NewProvinceParams = z.infer<typeof insertProvinceParams>
export type UpdateProvinceParams = z.infer<typeof updateProvinceParams>
export type ProvinceId = z.infer<typeof provinceIdSchema>['id']

// this type infers the return from getProvinces() - meaning it will include any joins
export type CompleteProvince = Awaited<
	ReturnType<typeof getProvinces>
>['provinces'][number]
