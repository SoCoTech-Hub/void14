import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { analyticsIndicatorCalcsRouter } from './analyticsIndicatorCalcs'
import { analyticsModelsRouter } from './analyticsModels'
import { analyticsModelLogsRouter } from './analyticsModelLogs'
import { analyticsPredictSamplesRouter } from './analyticsPredictSamples'
import { analyticsPredictionActionsRouter } from './analyticsPredictionActions'
import { analyticsPredictionsRouter } from './analyticsPredictions'
import { analyticsTrainSamplesRouter } from './analyticsTrainSamples'
import { analyticsUsedAnalysablesRouter } from './analyticsUsedAnalysables'
import { analyticsUsedFilesRouter } from './analyticsUsedFiles'

export const appRouter = router({
	computers: computersRouter,
	analyticsIndicatorCalcs: analyticsIndicatorCalcsRouter,
	analyticsModels: analyticsModelsRouter,
	analyticsModelLogs: analyticsModelLogsRouter,
	analyticsPredictSamples: analyticsPredictSamplesRouter,
	analyticsPredictionActions: analyticsPredictionActionsRouter,
	analyticsPredictions: analyticsPredictionsRouter,
	analyticsTrainSamples: analyticsTrainSamplesRouter,
	analyticsUsedAnalysables: analyticsUsedAnalysablesRouter,
	analyticsUsedFiles: analyticsUsedFilesRouter
})

export type AppRouter = typeof appRouter
