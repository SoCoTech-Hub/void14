import { sql } from 'drizzle-orm'
import {
	varchar,
	integer,
	text,
	boolean,
	timestamp,
	pgTable
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getFiles } from '@/lib/api/files/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const files = pgTable(
	'files',
	{
		organizationId: varchar('organization_id', { length: 191 }).notNull(),
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		author: varchar('author', { length: 256 }),
		component: varchar('component', { length: 256 }),
		contentHash: varchar('content_hash', { length: 256 }),
		contextId: varchar('context_id', { length: 256 }),
		fileArea: varchar('file_area', { length: 256 }),
		fileName: varchar('file_name', { length: 256 }),
		filePath: varchar('file_path', { length: 256 }),
		fileSize: integer('file_size'),
		itemId: varchar('item_id', { length: 256 }),
		license: varchar('license', { length: 256 }),
		mimeType: varchar('mime_type', { length: 256 }),
		pathNameHash: varchar('path_name_hash', { length: 256 }),
		referenceFileId: varchar('reference_file_id', { length: 256 }),
		sortOrder: integer('sort_order'),
		source: text('source'),
		status: boolean('status'),
		userId: varchar('user_id', { length: 256 }).notNull(),

		createdAt: timestamp('created_at')
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp('updated_at')
			.notNull()
			.default(sql`now()`)
	},
	(files) => {
		return {
			sortOrderIndex: uniqueIndex('sort_order_idx').on(files.sortOrder)
		}
	}
)

// Schema for files - used to validate API requests
const baseSchema = createSelectSchema(files).omit(timestamps)

export const insertFileSchema = createInsertSchema(files).omit(timestamps)
export const insertFileParams = baseSchema
	.extend({
		fileSize: z.coerce.number(),
		sortOrder: z.coerce.number(),
		status: z.coerce.boolean()
	})
	.omit({
		id: true,
		userId: true
	})

export const updateFileSchema = baseSchema
export const updateFileParams = baseSchema
	.extend({
		fileSize: z.coerce.number(),
		sortOrder: z.coerce.number(),
		status: z.coerce.boolean()
	})
	.omit({
		userId: true
	})
export const fileIdSchema = baseSchema.pick({ id: true })

// Types for files - used to type API request params and within Components
export type File = typeof files.$inferSelect
export type NewFile = z.infer<typeof insertFileSchema>
export type NewFileParams = z.infer<typeof insertFileParams>
export type UpdateFileParams = z.infer<typeof updateFileParams>
export type FileId = z.infer<typeof fileIdSchema>['id']

// this type infers the return from getFiles() - meaning it will include any joins
export type CompleteFile = Awaited<ReturnType<typeof getFiles>>['files'][number]
