import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { workshopsRouter } from "./workshops";
import { workshopAggregationsRouter } from "./workshopAggregations";
import { workshopAssessmentsRouter } from "./workshopAssessments";
import { workshopGradesRouter } from "./workshopGrades";
import { workshopSubmissionsRouter } from "./workshopSubmissions";
import { workshopAllocationSchedulesRouter } from "./workshopAllocationSchedules";
import { workshopEvalBestSettingsRouter } from "./workshopEvalBestSettings";
import { workshopFormAccumulativesRouter } from "./workshopFormAccumulatives";
import { workshopFormCommentsRouter } from "./workshopFormComments";
import { workshopFormNumErrorsRouter } from "./workshopFormNumErrors";
import { workshopFormNumErrorMapsRouter } from "./workshopFormNumErrorMaps";
import { workshopFormRubricsRouter } from "./workshopFormRubrics";
import { workshopFormRubricConfigsRouter } from "./workshopFormRubricConfigs";
import { workshopFormRubricLevelsRouter } from "./workshopFormRubricLevels";

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
