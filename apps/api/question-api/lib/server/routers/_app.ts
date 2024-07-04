import { router } from "../server/trpc";
import { questionAnswersRouter } from "./questionAnswers";
import { questionAttemptsRouter } from "./questionAttempts";
import { questionAttemptStepDatasRouter } from "./questionAttemptStepDatas";
import { questionAttemptStepsRouter } from "./questionAttemptSteps";
import { questionBankEntriesRouter } from "./questionBankEntries";
import { questionCalculatedOptionsRouter } from "./questionCalculatedOptions";
import { questionCalculatedsRouter } from "./questionCalculateds";
import { questionCategoriesRouter } from "./questionCategories";
import { questionDatasetDefinitionsRouter } from "./questionDatasetDefinitions";
import { questionDatasetItemsRouter } from "./questionDatasetItems";
import { questionDatasetsRouter } from "./questionDatasets";
import { questionDdwtosRouter } from "./questionDdwtos";
import { questionGapselectsRouter } from "./questionGapselects";
import { questionHintsRouter } from "./questionHints";
import { questionMultianswersRouter } from "./questionMultianswers";
import { questionNumericalOptionsRouter } from "./questionNumericalOptions";
import { questionNumericalsRouter } from "./questionNumericals";
import { questionNumericalUnitsRouter } from "./questionNumericalUnits";
import { questionReferencesRouter } from "./questionReferences";
import { questionResponseAnalysisesRouter } from "./questionResponseAnalysises";
import { questionResponseCountsRouter } from "./questionResponseCounts";
import { questionsRouter } from "./questions";
import { questionSetReferencesRouter } from "./questionSetReferences";
import { questionStatisticsRouter } from "./questionStatistics";
import { questionTruefalseRouter } from "./questionTruefalse";
import { questionUsagesRouter } from "./questionUsages";
import { questionVersionsRouter } from "./questionVersions";

export const appRouter = router({
  questions: questionsRouter,
  questionCategories: questionCategoriesRouter,
  questionDatasetDefinitions: questionDatasetDefinitionsRouter,
  questionCalculatedOptions: questionCalculatedOptionsRouter,
  questionAnswers: questionAnswersRouter,
  questionUsages: questionUsagesRouter,
  questionTruefalse: questionTruefalseRouter,
  questionBankEntries: questionBankEntriesRouter,
  questionCalculateds: questionCalculatedsRouter,
  questionDatasets: questionDatasetsRouter,
  questionDdwtos: questionDdwtosRouter,
  questionGapselects: questionGapselectsRouter,
  questionHints: questionHintsRouter,
  questionMultianswers: questionMultianswersRouter,
  questionNumericals: questionNumericalsRouter,
  questionNumericalOptions: questionNumericalOptionsRouter,
  questionVersions: questionVersionsRouter,
  questionStatistics: questionStatisticsRouter,
  questionSetReferences: questionSetReferencesRouter,
  questionResponseAnalysises: questionResponseAnalysisesRouter,
  questionResponseCounts: questionResponseCountsRouter,
  questionNumericalUnits: questionNumericalUnitsRouter,
  questionDatasetItems: questionDatasetItemsRouter,
  questionAttempts: questionAttemptsRouter,
  questionAttemptSteps: questionAttemptStepsRouter,
  questionAttemptStepDatas: questionAttemptStepDatasRouter,
  questionReferences: questionReferencesRouter,
});

export type AppRouter = typeof appRouter;
