import { router } from "../server/trpc";
import { analyticsIndicatorCalcsRouter } from "./analyticsIndicatorCalcs";
import { analyticsModelLogsRouter } from "./analyticsModelLogs";
import { analyticsModelsRouter } from "./analyticsModels";
import { analyticsPredictionActionsRouter } from "./analyticsPredictionActions";
import { analyticsPredictionsRouter } from "./analyticsPredictions";
import { analyticsPredictSamplesRouter } from "./analyticsPredictSamples";
import { analyticsTrainSamplesRouter } from "./analyticsTrainSamples";
import { analyticsUsedAnalysablesRouter } from "./analyticsUsedAnalysables";
import { analyticsUsedFilesRouter } from "./analyticsUsedFiles";
import { computersRouter } from "./computers";

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
  analyticsUsedFiles: analyticsUsedFilesRouter,
});

export type AppRouter = typeof appRouter;
