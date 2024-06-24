import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { lessonsRouter } from "./lessons";
import { lessonPagesRouter } from "./lessonPages";
import { lessonAnswersRouter } from "./lessonAnswers";
import { lessonAttemptsRouter } from "./lessonAttempts";
import { lessonBranchesRouter } from "./lessonBranches";
import { lessonGradesRouter } from "./lessonGrades";
import { lessonOverridesRouter } from "./lessonOverrides";
import { lessonTimerRouter } from "./lessonTimer";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  lessons: lessonsRouter,
  lessonPages: lessonPagesRouter,
  lessonAnswers: lessonAnswersRouter,
  lessonAttempts: lessonAttemptsRouter,
  lessonBranches: lessonBranchesRouter,
  lessonGrades: lessonGradesRouter,
  lessonOverrides: lessonOverridesRouter,
  lessonTimer: lessonTimerRouter,
