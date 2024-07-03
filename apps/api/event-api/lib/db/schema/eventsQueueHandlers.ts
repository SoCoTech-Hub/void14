import { sql } from 'drizzle-orm'
import { text, varchar, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getEventsQueueHandlers } from '@/lib/api/eventsQueueHandlers/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const eventsQueueHandlers = pgTable('events_queue_handlers', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	errorMessage: text('error_message'),
	handlerId: varchar('handler_id', { length: 256 }),
	queuedEventId: varchar('queued_event_id', { length: 256 }),
	status: integer('status'),

	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`)
})

// Schema for eventsQueueHandlers - used to validate API requests
const baseSchema = createSelectSchema(eventsQueueHandlers).omit(timestamps)

export const insertEventsQueueHandlerSchema =
	createInsertSchema(eventsQueueHandlers).omit(timestamps)
export const insertEventsQueueHandlerParams = baseSchema
	.extend({
		status: z.coerce.number()
	})
	.omit({
		id: true
	})

export const updateEventsQueueHandlerSchema = baseSchema
export const updateEventsQueueHandlerParams = baseSchema.extend({
	status: z.coerce.number()
})
export const eventsQueueHandlerIdSchema = baseSchema.pick({ id: true })

// Types for eventsQueueHandlers - used to type API request params and within Components
export type EventsQueueHandler = typeof eventsQueueHandlers.$inferSelect
export type NewEventsQueueHandler = z.infer<
	typeof insertEventsQueueHandlerSchema
>
export type NewEventsQueueHandlerParams = z.infer<
	typeof insertEventsQueueHandlerParams
>
export type UpdateEventsQueueHandlerParams = z.infer<
	typeof updateEventsQueueHandlerParams
>
export type EventsQueueHandlerId = z.infer<
	typeof eventsQueueHandlerIdSchema
>['id']

// this type infers the return from getEventsQueueHandlers() - meaning it will include any joins
export type CompleteEventsQueueHandler = Awaited<
	ReturnType<typeof getEventsQueueHandlers>
>['eventsQueueHandlers'][number]
