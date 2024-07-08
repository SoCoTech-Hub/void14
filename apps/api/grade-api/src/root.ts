import { createTRPCRouter } from "./trpc";

import { gradeCategoriesRouter } from './routers/gradeCategories';
import { gradeCategoriesHistoriesRouter } from './routers/gradeCategoriesHistories';
import { gradeGradesRouter } from './routers/gradeGrades';
import { gradeGradesHistoriesRouter } from './routers/gradeGradesHistories';
import { gradeImportNewitemsRouter } from './routers/gradeImportNewitems';
import { gradeImportValuesRouter } from './routers/gradeImportValues';
import { gradeItemsRouter } from './routers/gradeItems';
import { gradeItemsHistoriesRouter } from './routers/gradeItemsHistories';
import { gradeLettersRouter } from './routers/gradeLetters';
import { gradeOutcomesRouter } from './routers/gradeOutcomes';
import { gradeOutcomesCoursesRouter } from './routers/gradeOutcomesCourses';
import { gradeOutcomesHistoriesRouter } from './routers/gradeOutcomesHistories';
import { gradeSettingsRouter } from './routers/gradeSettings';
import { gradingAreasRouter } from './routers/gradingAreas';
import { gradingDefinitionsRouter } from './routers/gradingDefinitions';
import { gradingformGuideCommentsRouter } from './routers/gradingformGuideComments';
import { gradingformGuideCriteriaRouter } from './routers/gradingformGuideCriteria';
import { gradingformGuideFillingsRouter } from './routers/gradingformGuideFillings';
import { gradingformRubricCriteriasRouter } from './routers/gradingformRubricCriterias';
import { gradingformRubricFillingsRouter } from './routers/gradingformRubricFillings';
import { gradingformRubricLevelsRouter } from './routers/gradingformRubricLevels';
import { gradingInstancesRouter } from './routers/gradingInstances';

export const appRouter = createTRPCRouter({
  gradeCategories: gradeCategoriesRouter,
  gradeCategoriesHistories: gradeCategoriesHistoriesRouter,
  gradeGrades: gradeGradesRouter,
  gradeGradesHistories: gradeGradesHistoriesRouter,
  gradeImportNewitems: gradeImportNewitemsRouter,
  gradeImportValues: gradeImportValuesRouter,
  gradeItems: gradeItemsRouter,
  gradeItemsHistories: gradeItemsHistoriesRouter,
  gradeLetters: gradeLettersRouter,
  gradeOutcomes: gradeOutcomesRouter,
  gradeOutcomesCourses: gradeOutcomesCoursesRouter,
  gradeOutcomesHistories: gradeOutcomesHistoriesRouter,
  gradeSettings: gradeSettingsRouter,
  gradingAreas: gradingAreasRouter,
  gradingDefinitions: gradingDefinitionsRouter,
  gradingformGuideComments: gradingformGuideCommentsRouter,
  gradingformGuideCriteria: gradingformGuideCriteriaRouter,
  gradingformGuideFillings: gradingformGuideFillingsRouter,
  gradingformRubricCriterias: gradingformRubricCriteriasRouter,
  gradingformRubricFillings: gradingformRubricFillingsRouter,
  gradingformRubricLevels: gradingformRubricLevelsRouter,
  gradingInstances: gradingInstancesRouter,
});

export type AppRouter = typeof appRouter;
