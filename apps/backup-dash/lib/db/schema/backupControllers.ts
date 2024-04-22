import { sql } from 'drizzle-orm'
import {
	varchar,
	text,
	integer,
	boolean,
	real,
	timestamp,
	pgTable,
	uniqueIndex
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getBackupControllers } from '@/lib/api/backupControllers/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const backupControllers = pgTable(
	'backup_controllers',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		backupId: varchar('backup_id', { length: 256 }),
		checksum: varchar('checksum', { length: 256 }),
		controller: text('controller'),
		execution: integer('execution'),
		executionTime: integer('execution_time'),
		format: varchar('format', { length: 256 }),
		interactive: boolean('interactive'),
		itemId: varchar('item_id', { length: 256 }),
		operation: varchar('operation', { length: 256 }),
		progress: real('progress'),
		purpose: integer('purpose'),
		status: integer('status'),
		type: varchar('type', { length: 256 }),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(backupControllers) => {
		return {
			backupIdIndex: uniqueIndex('bc_backup_id_idx').on(
				backupControllers.backupId
			)
		}
	}
)

// Schema for backupControllers - used to validate API requests
const baseSchema = createSelectSchema(backupControllers).omit(timestamps)

export const insertBackupControllerSchema =
	createInsertSchema(backupControllers).omit(timestamps)
export const insertBackupControllerParams = baseSchema
	.extend({
		execution: z.coerce.number(),
		executionTime: z.coerce.number(),
		interactive: z.coerce.boolean(),
		progress: z.coerce.number(),
		purpose: z.coerce.number(),
		status: z.coerce.number()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateBackupControllerSchema = baseSchema
export const updateBackupControllerParams = baseSchema
	.extend({
		execution: z.coerce.number(),
		executionTime: z.coerce.number(),
		interactive: z.coerce.boolean(),
		progress: z.coerce.number(),
		purpose: z.coerce.number(),
		status: z.coerce.number()
	})
	.omit({
		userId: true
	})
export const backupControllerIdSchema = baseSchema.pick({ id: true })

// Types for backupControllers - used to type API request params and within Components
export type BackupController = typeof backupControllers.$inferSelect
export type NewBackupController = z.infer<typeof insertBackupControllerSchema>
export type NewBackupControllerParams = z.infer<
	typeof insertBackupControllerParams
>
export type UpdateBackupControllerParams = z.infer<
	typeof updateBackupControllerParams
>
export type BackupControllerId = z.infer<typeof backupControllerIdSchema>['id']

// this type infers the return from getBackupControllers() - meaning it will include any joins
export type CompleteBackupController = Awaited<
	ReturnType<typeof getBackupControllers>
>['backupControllers'][number]
