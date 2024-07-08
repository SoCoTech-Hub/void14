import { createTRPCRouter } from "./trpc";

import { analyticsIndicatorCalcsRouter } from './routers/analyticsIndicatorCalcs';
import { analyticsModelLogsRouter } from './routers/analyticsModelLogs';
import { analyticsModelsRouter } from './routers/analyticsModels';
import { analyticsPredictionActionsRouter } from './routers/analyticsPredictionActions';
import { analyticsPredictionsRouter } from './routers/analyticsPredictions';
import { analyticsPredictSamplesRouter } from './routers/analyticsPredictSamples';
import { analyticsTrainSamplesRouter } from './routers/analyticsTrainSamples';
import { analyticsUsedAnalysablesRouter } from './routers/analyticsUsedAnalysables';
import { analyticsUsedFilesRouter } from './routers/analyticsUsedFiles';

export const appRouter = createTRPCRouter({
  analyticsIndicatorCalcs: analyticsIndicatorCalcsRouter,
  analyticsModelLogs: analyticsModelLogsRouter,
  analyticsModels: analyticsModelsRouter,
  analyticsPredictionActions: analyticsPredictionActionsRouter,
  analyticsPredictions: analyticsPredictionsRouter,
  analyticsPredictSamples: analyticsPredictSamplesRouter,
  analyticsTrainSamples: analyticsTrainSamplesRouter,
  analyticsUsedAnalysables: analyticsUsedAnalysablesRouter,
  analyticsUsedFiles: analyticsUsedFilesRouter,
});

export type AppRouter = typeof appRouter;
