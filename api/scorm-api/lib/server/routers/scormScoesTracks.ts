import {
	getScormScoesTrackById,
	getScormScoesTracks
} from '@/lib/api/scormScoesTracks/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	scormScoesTrackIdSchema,
	insertScormScoesTrackParams,
	updateScormScoesTrackParams
} from '@/lib/db/schema/scormScoesTracks'
import {
	createScormScoesTrack,
	deleteScormScoesTrack,
	updateScormScoesTrack
} from '@/lib/api/scormScoesTracks/mutations'

export const scormScoesTracksRouter = router({
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
