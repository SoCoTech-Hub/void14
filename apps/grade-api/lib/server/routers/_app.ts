import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { gradeCategoriesRouter } from "./gradeCategories";
import { gradeCategoriesHistoriesRouter } from "./gradeCategoriesHistories";
import { gradeGradesRouter } from "./gradeGrades";
import { gradeGradesHistoriesRouter } from "./gradeGradesHistories";
import { gradeImportNewitemsRouter } from "./gradeImportNewitems";
import { gradeImportValuesRouter } from "./gradeImportValues";
import { gradeItemsRouter } from "./gradeItems";
import { gradeItemsHistoriesRouter } from "./gradeItemsHistories";
import { gradeLettersRouter } from "./gradeLetters";
import { gradeOutcomesRouter } from "./gradeOutcomes";
import { gradeOutcomesCoursesRouter } from "./gradeOutcomesCourses";
import { gradeOutcomesHistoriesRouter } from "./gradeOutcomesHistories";
import { gradeSettingsRouter } from "./gradeSettings";
import { gradingAreasRouter } from "./gradingAreas";
import { gradingDefinitionsRouter } from "./gradingDefinitions";
import { gradingInstancesRouter } from "./gradingInstances";
import { gradingformGuideCommentsRouter } from "./gradingformGuideComments";
import { gradingformGuideCriteriaRouter } from "./gradingformGuideCriteria";
import { gradingformGuideFillingsRouter } from "./gradingformGuideFillings";
import { gradingformRubricCriteriasRouter } from "./gradingformRubricCriterias";
import { gradingformRubricFillingsRouter } from "./gradingformRubricFillings";
import { gradingformRubricLevelsRouter } from "./gradingformRubricLevels";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
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
  gradingInstances: gradingInstancesRouter,
  gradingformGuideComments: gradingformGuideCommentsRouter,
  gradingformGuideCriteria: gradingformGuideCriteriaRouter,
  gradingformGuideFillings: gradingformGuideFillingsRouter,
  gradingformRubricCriterias: gradingformRubricCriteriasRouter,
  gradingformRubricFillings: gradingformRubricFillingsRouter,
  gradingformRubricLevels: gradingformRubricLevelsRouter,
