import {
	getAnalyticsModelLogById,
	getAnalyticsModelLogs
} from '@/lib/api/analyticsModelLogs/queries'
import { publicProcedure, router } from '@/lib/server/trpc'
import {
	analyticsModelLogIdSchema,
	insertAnalyticsModelLogParams,
	updateAnalyticsModelLogParams
} from '@/lib/db/schema/analyticsModelLogs'
import {
	createAnalyticsModelLog,
	deleteAnalyticsModelLog,
	updateAnalyticsModelLog
} from '@/lib/api/analyticsModelLogs/mutations'

export const analyticsModelLogsRouter = router({
	getAnalyticsModelLogs: publicProcedure.query(async () => {
		return getAnalyticsModelLogs()
	}),
	getAnalyticsModelLogById: publicProcedure
		.input(analyticsModelLogIdSchema)
		.query(async ({ input }) => {
			return getAnalyticsModelLogById(input.id)
		}),
	createAnalyticsModelLog: publicProcedure
		.input(insertAnalyticsModelLogParams)
		.mutation(async ({ input }) => {
			return createAnalyticsModelLog(input)
		}),
	updateAnalyticsModelLog: publicProcedure
		.input(updateAnalyticsModelLogParams)
		.mutation(async ({ input }) => {
			return updateAnalyticsModelLog(input.id, input)
		}),
	deleteAnalyticsModelLog: publicProcedure
		.input(analyticsModelLogIdSchema)
		.mutation(async ({ input }) => {
			return deleteAnalyticsModelLog(input.id)
		})
})
