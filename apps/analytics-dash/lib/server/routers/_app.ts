import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { analyticsIndicatorCalcsRouter } from "./analyticsIndicatorCalcs";
import { analyticsModelsRouter } from "./analyticsModels";
import { analyticsModelsLogRouter } from "./analyticsModelsLog";
import { analyticsPredictSamplesRouter } from "./analyticsPredictSamples";
import { analyticsPredictionActionsRouter } from "./analyticsPredictionActions";
import { analyticsPredictionsRouter } from "./analyticsPredictions";
import { analyticsTrainSamplesRouter } from "./analyticsTrainSamples";
import { analyticsUsedAnalysablesRouter } from "./analyticsUsedAnalysables";
import { analyticsUsedFilesRouter } from "./analyticsUsedFiles";
import { analyticsModelsLogsRouter } from "./analyticsModelsLogs";

export const appRouter = router({
  computers: computersRouter,
  analyticsIndicatorCalcs: analyticsIndicatorCalcsRouter,
  analyticsModels: analyticsModelsRouter,
  analyticsModelsLog: analyticsModelsLogRouter,
  analyticsPredictSamples: analyticsPredictSamplesRouter,
  analyticsPredictionActions: analyticsPredictionActionsRouter,
  analyticsPredictions: analyticsPredictionsRouter,
  analyticsTrainSamples: analyticsTrainSamplesRouter,
  analyticsUsedAnalysables: analyticsUsedAnalysablesRouter,
  analyticsUsedFiles: analyticsUsedFilesRouter,
  analyticsModelsLogs: analyticsModelsLogsRouter,
});

export type AppRouter = typeof appRouter;
