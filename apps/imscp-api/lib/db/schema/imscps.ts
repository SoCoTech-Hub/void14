import { sql } from 'drizzle-orm'
import { varchar, text, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getImscps } from '@/lib/api/imscps/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const imscps = pgTable('imscps', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	course: varchar('course', { length: 256 }),
	intro: text('intro'),
	introFormat: integer('intro_format'),
	keepOld: integer('keep_old'),
	name: varchar('name', { length: 256 }),
	revision: integer('revision'),
	structure: text('structure'),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for imscps - used to validate API requests
const baseSchema = createSelectSchema(imscps).omit(timestamps)

export const insertImscpSchema = createInsertSchema(imscps).omit(timestamps)
export const insertImscpParams = baseSchema
	.extend({
		introFormat: z.coerce.number(),
		keepOld: z.coerce.number(),
		revision: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateImscpSchema = baseSchema
export const updateImscpParams = baseSchema.extend({
	introFormat: z.coerce.number(),
	keepOld: z.coerce.number(),
	revision: z.coerce.number()
})
export const imscpIdSchema = baseSchema.pick({ id: true })

// Types for imscps - used to type API request params and within Components
export type Imscp = typeof imscps.$inferSelect
export type NewImscp = z.infer<typeof insertImscpSchema>
export type NewImscpParams = z.infer<typeof insertImscpParams>
export type UpdateImscpParams = z.infer<typeof updateImscpParams>
export type ImscpId = z.infer<typeof imscpIdSchema>['id']

// this type infers the return from getImscps() - meaning it will include any joins
export type CompleteImscp = Awaited<
	ReturnType<typeof getImscps>
>['imscps'][number]
