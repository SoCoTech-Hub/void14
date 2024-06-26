import { getQuizeById, getQuizes } from '@/lib/api/quizes/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	quizIdSchema,
	insertQuizeParams,
	updateQuizeParams
} from '@/lib/db/schema/quizes'
import {
	createQuize,
	deleteQuize,
	updateQuize
} from '@/lib/api/quizes/mutations'

export const quizesRouter = router({
	getQuizes: publicProcedure.query(async () => {
		return getQuizes()
	}),
	getQuizeById: publicProcedure.input(quizIdSchema).query(async ({ input }) => {
		return getQuizeById(input.id)
	}),
	createQuize: publicProcedure
		.input(insertQuizeParams)
		.mutation(async ({ input }) => {
			return createQuize(input)
		}),
	updateQuize: publicProcedure
		.input(updateQuizeParams)
		.mutation(async ({ input }) => {
			return updateQuize(input.id, input)
		}),
	deleteQuize: publicProcedure
		.input(quizIdSchema)
		.mutation(async ({ input }) => {
			return deleteQuize(input.id)
		})
})
