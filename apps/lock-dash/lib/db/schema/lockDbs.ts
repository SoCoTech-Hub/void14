import { timestamp, varchar, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getLockDbs } from '@/lib/api/lockDbs/queries'

import { nanoid } from '@/lib/utils'

export const lockDbs = pgTable('lock_dbs', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	expires: timestamp('expires'),
	owner: varchar('owner', { length: 256 }),
	resourceKey: varchar('resource_key', { length: 256 })
})

// Schema for lockDbs - used to validate API requests
const baseSchema = createSelectSchema(lockDbs)

export const insertLockDbSchema = createInsertSchema(lockDbs)
export const insertLockDbParams = baseSchema
	.extend({
		expires: z.coerce.string().min(1)
	})
	.omit({
		id: true
	})

export const updateLockDbSchema = baseSchema
export const updateLockDbParams = baseSchema.extend({
	expires: z.coerce.string().min(1)
})
export const lockDbIdSchema = baseSchema.pick({ id: true })

// Types for lockDbs - used to type API request params and within Components
export type LockDb = typeof lockDbs.$inferSelect
export type NewLockDb = z.infer<typeof insertLockDbSchema>
export type NewLockDbParams = z.infer<typeof insertLockDbParams>
export type UpdateLockDbParams = z.infer<typeof updateLockDbParams>
export type LockDbId = z.infer<typeof lockDbIdSchema>['id']

// this type infers the return from getLockDbs() - meaning it will include any joins
export type CompleteLockDb = Awaited<
	ReturnType<typeof getLockDbs>
>['lockDbs'][number]
