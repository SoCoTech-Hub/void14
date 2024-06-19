import { router } from '@/lib/server/trpc'
import { questionsRouter } from './questions'
import { questionCategoriesRouter } from './questionCategories'
import { questionDatasetDefinitionsRouter } from './questionDatasetDefinitions'
import { questionCalculatedOptionsRouter } from './questionCalculatedOptions'
import { questionAnswersRouter } from './questionAnswers'
import { questionUsagesRouter } from './questionUsages'
import { questionTruefalseRouter } from './questionTruefalse'
import { questionBankEntriesRouter } from './questionBankEntries'
import { questionCalculatedsRouter } from './questionCalculateds'
import { questionDatasetsRouter } from './questionDatasets'
import { questionDdwtosRouter } from './questionDdwtos'
import { questionGapselectsRouter } from './questionGapselects'
import { questionHintsRouter } from './questionHints'
import { questionMultianswersRouter } from './questionMultianswers'
import { questionNumericalsRouter } from './questionNumericals'
import { questionNumericalOptionsRouter } from './questionNumericalOptions'
import { questionVersionsRouter } from './questionVersions'
import { questionStatisticsRouter } from './questionStatistics'
import { questionSetReferencesRouter } from './questionSetReferences'
import { questionResponseAnalysisesRouter } from './questionResponseAnalysises'
import { questionResponseCountsRouter } from './questionResponseCounts'
import { questionNumericalUnitsRouter } from './questionNumericalUnits'
import { questionDatasetItemsRouter } from './questionDatasetItems'
import { questionAttemptsRouter } from './questionAttempts'
import { questionAttemptStepsRouter } from './questionAttemptSteps'
import { questionAttemptStepDatasRouter } from './questionAttemptStepDatas'
import { questionReferencesRouter } from './questionReferences'

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
	questionReferences: questionReferencesRouter
})

export type AppRouter = typeof appRouter
