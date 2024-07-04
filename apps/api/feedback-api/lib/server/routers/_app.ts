import { router } from '../server/trpc'
import { feedbacksRouter } from "./feedbacks";
import { feedbackCompletedsRouter } from "./feedbackCompleteds";
import { feedbackCompletedtmpsRouter } from "./feedbackCompletedtmps";
import { feedbackItemsRouter } from "./feedbackItems";
import { feedbackSitecourseMapsRouter } from "./feedbackSitecourseMaps";
import { feedbackTemplatesRouter } from "./feedbackTemplates";
import { feedbackValuesRouter } from "./feedbackValues";
import { feedbackValuetmpsRouter } from "./feedbackValuetmps";

export const appRouter = router({ feedbacks: feedbacksRouter ,
  feedbackCompleteds: feedbackCompletedsRouter,
  })

export type AppRouter = typeof appRouter
  feedbackCompletedtmps: feedbackCompletedtmpsRouter,
  feedbackItems: feedbackItemsRouter,
  feedbackSitecourseMaps: feedbackSitecourseMapsRouter,
  feedbackTemplates: feedbackTemplatesRouter,
  feedbackValues: feedbackValuesRouter,
  feedbackValuetmps: feedbackValuetmpsRouter,
