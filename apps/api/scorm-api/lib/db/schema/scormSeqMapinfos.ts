import { varchar, boolean, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { scormSeqObjectives } from './scormSeqObjectives'
import { scormScoes } from './scormScoes'
import { scormSeqObjectives } from './scormSeqObjectives'
import { type getScormSeqMapinfos } from '../api/scormSeqMapinfos/queries'

import { nanoid } from '@soco/utils'

export const scormSeqMapinfos = pgTable('scorm_seq_mapinfos', {
	organizationId: varchar('organization_id', { length: 191 }).notNull(),
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	scormSeqObjectiveId: varchar('scorm_seq_objective_id', { length: 256 })
		.references(() => scormSeqObjectives.id)
		.notNull(),
	readNormalizedMeasure: boolean('read_normalized_measure'),
	readSatisfiedStatus: boolean('read_satisfied_status'),
	scormScoeId: varchar('scorm_scoe_id', { length: 256 })
		.references(() => scormScoes.id)
		.notNull(),
	scormSeqTargetObjectiveId: varchar('scorm_seq_target_objective_id', {
		length: 256
	})
		.references(() => scormSeqObjectives.id)
		.notNull(),
	writeNormalizedMeasure: boolean('write_normalized_measure'),
	writeSatisfiedStatus: boolean('write_satisfied_status')
})

// Schema for scormSeqMapinfos - used to validate API requests
const baseSchema = createSelectSchema(scormSeqMapinfos)

export const insertScormSeqMapinfoSchema = createInsertSchema(scormSeqMapinfos)
export const insertScormSeqMapinfoParams = baseSchema
	.extend({
		scormSeqObjectiveId: z.coerce.string().min(1),
		readNormalizedMeasure: z.coerce.boolean(),
		readSatisfiedStatus: z.coerce.boolean(),
		scormScoeId: z.coerce.string().min(1),
		scormSeqTargetObjectiveId: z.coerce.string().min(1),
		writeNormalizedMeasure: z.coerce.boolean(),
		writeSatisfiedStatus: z.coerce.boolean()
	})
	.omit({
		id: true
	})

export const updateScormSeqMapinfoSchema = baseSchema
export const updateScormSeqMapinfoParams = baseSchema.extend({
	scormSeqObjectiveId: z.coerce.string().min(1),
	readNormalizedMeasure: z.coerce.boolean(),
	readSatisfiedStatus: z.coerce.boolean(),
	scormScoeId: z.coerce.string().min(1),
	scormSeqTargetObjectiveId: z.coerce.string().min(1),
	writeNormalizedMeasure: z.coerce.boolean(),
	writeSatisfiedStatus: z.coerce.boolean()
})
export const scormSeqMapinfoIdSchema = baseSchema.pick({ id: true })

// Types for scormSeqMapinfos - used to type API request params and within Components
export type ScormSeqMapinfo = typeof scormSeqMapinfos.$inferSelect
export type NewScormSeqMapinfo = z.infer<typeof insertScormSeqMapinfoSchema>
export type NewScormSeqMapinfoParams = z.infer<
	typeof insertScormSeqMapinfoParams
>
export type UpdateScormSeqMapinfoParams = z.infer<
	typeof updateScormSeqMapinfoParams
>
export type ScormSeqMapinfoId = z.infer<typeof scormSeqMapinfoIdSchema>['id']

// this type infers the return from getScormSeqMapinfos() - meaning it will include any joins
export type CompleteScormSeqMapinfo = Awaited<
	ReturnType<typeof getScormSeqMapinfos>
>['scormSeqMapinfos'][number]
