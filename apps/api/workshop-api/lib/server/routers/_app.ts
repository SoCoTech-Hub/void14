import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { workshopAggregationsRouter } from "./workshopAggregations";
import { workshopAllocationSchedulesRouter } from "./workshopAllocationSchedules";
import { workshopAssessmentsRouter } from "./workshopAssessments";
import { workshopEvalBestSettingsRouter } from "./workshopEvalBestSettings";
import { workshopFormAccumulativesRouter } from "./workshopFormAccumulatives";
import { workshopFormCommentsRouter } from "./workshopFormComments";
import { workshopFormNumErrorMapsRouter } from "./workshopFormNumErrorMaps";
import { workshopFormNumErrorsRouter } from "./workshopFormNumErrors";
import { workshopFormRubricConfigsRouter } from "./workshopFormRubricConfigs";
import { workshopFormRubricLevelsRouter } from "./workshopFormRubricLevels";
import { workshopFormRubricsRouter } from "./workshopFormRubrics";
import { workshopGradesRouter } from "./workshopGrades";
import { workshopsRouter } from "./workshops";
import { workshopSubmissionsRouter } from "./workshopSubmissions";

export const appRouter = router({
  computers: computersRouter,
  workshops: workshopsRouter,
  workshopAggregations: workshopAggregationsRouter,
  workshopAssessments: workshopAssessmentsRouter,
  workshopGrades: workshopGradesRouter,
  workshopSubmissions: workshopSubmissionsRouter,
  workshopAllocationSchedules: workshopAllocationSchedulesRouter,
  workshopEvalBestSettings: workshopEvalBestSettingsRouter,
  workshopFormAccumulatives: workshopFormAccumulativesRouter,
  workshopFormComments: workshopFormCommentsRouter,
  workshopFormNumErrors: workshopFormNumErrorsRouter,
  workshopFormNumErrorMaps: workshopFormNumErrorMapsRouter,
  workshopFormRubrics: workshopFormRubricsRouter,
  workshopFormRubricConfigs: workshopFormRubricConfigsRouter,
  workshopFormRubricLevels: workshopFormRubricLevelsRouter,
});

export type AppRouter = typeof appRouter;
