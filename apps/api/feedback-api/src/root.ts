import { createTRPCRouter } from "./trpc";

import { feedbackCompletedsRouter } from './routers/feedbackCompleteds';
import { feedbackCompletedtmpsRouter } from './routers/feedbackCompletedtmps';
import { feedbackItemsRouter } from './routers/feedbackItems';
import { feedbacksRouter } from './routers/feedbacks';
import { feedbackSitecourseMapsRouter } from './routers/feedbackSitecourseMaps';
import { feedbackTemplatesRouter } from './routers/feedbackTemplates';
import { feedbackValuesRouter } from './routers/feedbackValues';
import { feedbackValuetmpsRouter } from './routers/feedbackValuetmps';

export const appRouter = createTRPCRouter({
  feedbackCompleteds: feedbackCompletedsRouter,
  feedbackCompletedtmps: feedbackCompletedtmpsRouter,
  feedbackItems: feedbackItemsRouter,
  feedbacks: feedbacksRouter,
  feedbackSitecourseMaps: feedbackSitecourseMapsRouter,
  feedbackTemplates: feedbackTemplatesRouter,
  feedbackValues: feedbackValuesRouter,
  feedbackValuetmps: feedbackValuetmpsRouter,
});

export type AppRouter = typeof appRouter;
