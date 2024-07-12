import { quizAttemptsRouter } from "./routers/quizAttempts";
import { quizesRouter } from "./routers/quizes";
import { quizFeedbacksRouter } from "./routers/quizFeedbacks";
import { quizGradesRouter } from "./routers/quizGrades";
import { quizOverridesRouter } from "./routers/quizOverrides";
import { quizOverviewRegradesRouter } from "./routers/quizOverviewRegrades";
import { quizReportsRouter } from "./routers/quizReports";
import { quizSectionsRouter } from "./routers/quizSections";
import { quizSlotsRouter } from "./routers/quizSlots";
import { quizStatisticsRouter } from "./routers/quizStatistics";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  quizAttempts: quizAttemptsRouter,
  quizes: quizesRouter,
  quizFeedbacks: quizFeedbacksRouter,
  quizGrades: quizGradesRouter,
  quizOverrides: quizOverridesRouter,
  quizOverviewRegrades: quizOverviewRegradesRouter,
  quizReports: quizReportsRouter,
  quizSections: quizSectionsRouter,
  quizSlots: quizSlotsRouter,
  quizStatistics: quizStatisticsRouter,
});

export type AppRouter = typeof appRouter;
