import { createTRPCRouter } from "./trpc";

import { workshopAggregationsRouter } from './routers/workshopAggregations';
import { workshopAllocationSchedulesRouter } from './routers/workshopAllocationSchedules';
import { workshopAssessmentsRouter } from './routers/workshopAssessments';
import { workshopEvalBestSettingsRouter } from './routers/workshopEvalBestSettings';
import { workshopFormAccumulativesRouter } from './routers/workshopFormAccumulatives';
import { workshopFormCommentsRouter } from './routers/workshopFormComments';
import { workshopFormNumErrorMapsRouter } from './routers/workshopFormNumErrorMaps';
import { workshopFormNumErrorsRouter } from './routers/workshopFormNumErrors';
import { workshopFormRubricConfigsRouter } from './routers/workshopFormRubricConfigs';
import { workshopFormRubricLevelsRouter } from './routers/workshopFormRubricLevels';
import { workshopFormRubricsRouter } from './routers/workshopFormRubrics';
import { workshopGradesRouter } from './routers/workshopGrades';
import { workshopsRouter } from './routers/workshops';
import { workshopSubmissionsRouter } from './routers/workshopSubmissions';

export const appRouter = createTRPCRouter({
  workshopAggregations: workshopAggregationsRouter,
  workshopAllocationSchedules: workshopAllocationSchedulesRouter,
  workshopAssessments: workshopAssessmentsRouter,
  workshopEvalBestSettings: workshopEvalBestSettingsRouter,
  workshopFormAccumulatives: workshopFormAccumulativesRouter,
  workshopFormComments: workshopFormCommentsRouter,
  workshopFormNumErrorMaps: workshopFormNumErrorMapsRouter,
  workshopFormNumErrors: workshopFormNumErrorsRouter,
  workshopFormRubricConfigs: workshopFormRubricConfigsRouter,
  workshopFormRubricLevels: workshopFormRubricLevelsRouter,
  workshopFormRubrics: workshopFormRubricsRouter,
  workshopGrades: workshopGradesRouter,
  workshops: workshopsRouter,
  workshopSubmissions: workshopSubmissionsRouter,
});

export type AppRouter = typeof appRouter;
