import { sql } from 'drizzle-orm'
import {
	varchar,
	boolean,
	integer,
	text,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getLogstoreStandardLogs } from '@/lib/api/logstoreStandardLogs/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const logstoreStandardLogs = pgTable('logstore_standard_logs', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	action: varchar('action', { length: 256 }),
	anonymous: boolean('anonymous'),
	component: varchar('component', { length: 256 }),
	contextId: varchar('context_id', { length: 256 }),
	contextInstanceId: varchar('context_instance_id', { length: 256 }),
	contextLevel: integer('context_level'),
	courseId: varchar('course_id', { length: 256 }),
	crud: varchar('crud', { length: 256 }),
	eduLevel: boolean('edu_level'),
	eventName: varchar('event_name', { length: 256 }),
	ip: varchar('ip', { length: 256 }),
	objectId: varchar('object_id', { length: 256 }),
	objectTable: varchar('object_table', { length: 256 }),
	origin: varchar('origin', { length: 256 }),
	other: text('other'),
	realUserId: varchar('real_user_id', { length: 256 }),
	relatedUserId: varchar('related_user_id', { length: 256 }),
	target: varchar('target', { length: 256 }),
	userId: varchar('user_id', { length: 256 }).notNull(),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for logstoreStandardLogs - used to validate API requests
const baseSchema = createSelectSchema(logstoreStandardLogs).omit(timestamps)

export const insertLogstoreStandardLogSchema =
	createInsertSchema(logstoreStandardLogs).omit(timestamps)
export const insertLogstoreStandardLogParams = baseSchema
	.extend({
		anonymous: z.coerce.boolean(),
		contextLevel: z.coerce.number(),
		eduLevel: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateLogstoreStandardLogSchema = baseSchema
export const updateLogstoreStandardLogParams = baseSchema
	.extend({
		anonymous: z.coerce.boolean(),
		contextLevel: z.coerce.number(),
		eduLevel: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const logstoreStandardLogIdSchema = baseSchema.pick({ id: true })

// Types for logstoreStandardLogs - used to type API request params and within Components
export type LogstoreStandardLog = typeof logstoreStandardLogs.$inferSelect
export type NewLogstoreStandardLog = z.infer<
	typeof insertLogstoreStandardLogSchema
>
export type NewLogstoreStandardLogParams = z.infer<
	typeof insertLogstoreStandardLogParams
>
export type UpdateLogstoreStandardLogParams = z.infer<
	typeof updateLogstoreStandardLogParams
>
export type LogstoreStandardLogId = z.infer<
	typeof logstoreStandardLogIdSchema
>['id']

// this type infers the return from getLogstoreStandardLogs() - meaning it will include any joins
export type CompleteLogstoreStandardLog = Awaited<
	ReturnType<typeof getLogstoreStandardLogs>
>['logstoreStandardLogs'][number]
