import { questionAnswersRouter } from "./routers/questionAnswers";
import { questionAttemptsRouter } from "./routers/questionAttempts";
import { questionAttemptStepDatasRouter } from "./routers/questionAttemptStepDatas";
import { questionAttemptStepsRouter } from "./routers/questionAttemptSteps";
import { questionBankEntriesRouter } from "./routers/questionBankEntries";
import { questionCalculatedOptionsRouter } from "./routers/questionCalculatedOptions";
import { questionCalculatedsRouter } from "./routers/questionCalculateds";
import { questionCategoriesRouter } from "./routers/questionCategories";
import { questionDatasetDefinitionsRouter } from "./routers/questionDatasetDefinitions";
import { questionDatasetItemsRouter } from "./routers/questionDatasetItems";
import { questionDatasetsRouter } from "./routers/questionDatasets";
import { questionDdwtosRouter } from "./routers/questionDdwtos";
import { questionGapselectsRouter } from "./routers/questionGapselects";
import { questionHintsRouter } from "./routers/questionHints";
import { questionMultianswersRouter } from "./routers/questionMultianswers";
import { questionNumericalOptionsRouter } from "./routers/questionNumericalOptions";
import { questionNumericalsRouter } from "./routers/questionNumericals";
import { questionNumericalUnitsRouter } from "./routers/questionNumericalUnits";
import { questionReferencesRouter } from "./routers/questionReferences";
import { questionResponseAnalysisesRouter } from "./routers/questionResponseAnalysises";
import { questionResponseCountsRouter } from "./routers/questionResponseCounts";
import { questionsRouter } from "./routers/questions";
import { questionSetReferencesRouter } from "./routers/questionSetReferences";
import { questionStatisticsRouter } from "./routers/questionStatistics";
import { questionTruefalseRouter } from "./routers/questionTruefalse";
import { questionUsagesRouter } from "./routers/questionUsages";
import { questionVersionsRouter } from "./routers/questionVersions";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  questionAnswers: questionAnswersRouter,
  questionAttempts: questionAttemptsRouter,
  questionAttemptStepDatas: questionAttemptStepDatasRouter,
  questionAttemptSteps: questionAttemptStepsRouter,
  questionBankEntries: questionBankEntriesRouter,
  questionCalculatedOptions: questionCalculatedOptionsRouter,
  questionCalculateds: questionCalculatedsRouter,
  questionCategories: questionCategoriesRouter,
  questionDatasetDefinitions: questionDatasetDefinitionsRouter,
  questionDatasetItems: questionDatasetItemsRouter,
  questionDatasets: questionDatasetsRouter,
  questionDdwtos: questionDdwtosRouter,
  questionGapselects: questionGapselectsRouter,
  questionHints: questionHintsRouter,
  questionMultianswers: questionMultianswersRouter,
  questionNumericalOptions: questionNumericalOptionsRouter,
  questionNumericals: questionNumericalsRouter,
  questionNumericalUnits: questionNumericalUnitsRouter,
  questionReferences: questionReferencesRouter,
  questionResponseAnalysises: questionResponseAnalysisesRouter,
  questionResponseCounts: questionResponseCountsRouter,
  questions: questionsRouter,
  questionSetReferences: questionSetReferencesRouter,
  questionStatistics: questionStatisticsRouter,
  questionTruefalse: questionTruefalseRouter,
  questionUsages: questionUsagesRouter,
  questionVersions: questionVersionsRouter,
});

export type AppRouter = typeof appRouter;
