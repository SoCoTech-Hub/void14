import { getQuizeById, getQuizes } from '../api/quizes/queries'
import { publicProcedure,createTRPCRouter } from '../trpc'
import {
	quizIdSchema,
	insertQuizeParams,
	updateQuizeParams
} from '@soco/quiz-db/schema/quizes'
import {
	createQuize,
	deleteQuize,
	updateQuize
} from '../api/quizes/mutations'

export const quizesRouter =createTRPCRouter({
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
