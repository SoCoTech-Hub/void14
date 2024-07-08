import {
	getScormScoesTrackById,
	getScormScoesTracks
} from '../api/scormScoesTracks/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	scormScoesTrackIdSchema,
	insertScormScoesTrackParams,
	updateScormScoesTrackParams
} from '@soco/scorm-db/schema/scormScoesTracks'
import {
	createScormScoesTrack,
	deleteScormScoesTrack,
	updateScormScoesTrack
} from '../api/scormScoesTracks/mutations'

export const scormScoesTracksRouter =createTRPCRouter({
	getScormScoesTracks: publicProcedure.query(async () => {
		return getScormScoesTracks()
	}),
	getScormScoesTrackById: publicProcedure
		.input(scormScoesTrackIdSchema)
		.query(async ({ input }) => {
			return getScormScoesTrackById(input.id)
		}),
	createScormScoesTrack: publicProcedure
		.input(insertScormScoesTrackParams)
		.mutation(async ({ input }) => {
			return createScormScoesTrack(input)
		}),
	updateScormScoesTrack: publicProcedure
		.input(updateScormScoesTrackParams)
		.mutation(async ({ input }) => {
			return updateScormScoesTrack(input.id, input)
		}),
	deleteScormScoesTrack: publicProcedure
		.input(scormScoesTrackIdSchema)
		.mutation(async ({ input }) => {
			return deleteScormScoesTrack(input.id)
		})
})
