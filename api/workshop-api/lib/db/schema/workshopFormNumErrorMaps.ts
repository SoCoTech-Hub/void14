import {
	real,
	integer,
	varchar,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { workshops } from './workshops'
import { type getWorkshopFormNumErrorMaps } from '@/lib/api/workshopFormNumErrorMaps/queries'

import { nanoid } from '@/lib/utils'

export const workshopFormNumErrorMaps = pgTable(
	'workshop_form_num_error_maps',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		grade: real('grade'),
		noNegative: integer('no_negative'),
		workshopId: varchar('workshop_id', { length: 256 })
			.references(() => workshops.id, { onDelete: 'cascade' })
			.notNull()
	},
	(workshopFormNumErrorMaps) => {
		return {
			workshopIdIndex: uniqueIndex(
				'workshop_form_num_error_maps_workshop_id_idx'
			).on(workshopFormNumErrorMaps.workshopId)
		}
	}
)

// Schema for workshopFormNumErrorMaps - used to validate API requests
const baseSchema = createSelectSchema(workshopFormNumErrorMaps)

export const insertWorkshopFormNumErrorMapSchema = createInsertSchema(
	workshopFormNumErrorMaps
)
export const insertWorkshopFormNumErrorMapParams = baseSchema
	.extend({
		grade: z.coerce.number(),
		noNegative: z.coerce.number(),
		workshopId: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateWorkshopFormNumErrorMapSchema = baseSchema
export const updateWorkshopFormNumErrorMapParams = baseSchema.extend({
	grade: z.coerce.number(),
	noNegative: z.coerce.number(),
	workshopId: z.coerce.string().min(1)
})
export const workshopFormNumErrorMapIdSchema = baseSchema.pick({ id: true })

// Types for workshopFormNumErrorMaps - used to type API request params and within Components
export type WorkshopFormNumErrorMap =
	typeof workshopFormNumErrorMaps.$inferSelect
export type NewWorkshopFormNumErrorMap = z.infer<
	typeof insertWorkshopFormNumErrorMapSchema
>
export type NewWorkshopFormNumErrorMapParams = z.infer<
	typeof insertWorkshopFormNumErrorMapParams
>
export type UpdateWorkshopFormNumErrorMapParams = z.infer<
	typeof updateWorkshopFormNumErrorMapParams
>
export type WorkshopFormNumErrorMapId = z.infer<
	typeof workshopFormNumErrorMapIdSchema
>['id']

// this type infers the return from getWorkshopFormNumErrorMaps() - meaning it will include any joins
export type CompleteWorkshopFormNumErrorMap = Awaited<
	ReturnType<typeof getWorkshopFormNumErrorMaps>
>['workshopFormNumErrorMaps'][number]
