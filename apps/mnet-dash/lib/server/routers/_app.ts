import { computersRouter } from './computers'
import { router } from '@/lib/server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { mnetApplicationsRouter } from "./mnetApplications";
import { mnetHostsRouter } from "./mnetHosts";
import { mnetServiceEnrolEnrolmentsRouter } from "./mnetServiceEnrolEnrolments";
import { mnetServiceEnrolCoursesRouter } from "./mnetServiceEnrolCourses";
import { mnetSsoAccessControlsRouter } from "./mnetSsoAccessControls";
import { mnetSessionsRouter } from "./mnetSessions";
import { mnetServicesRouter } from "./mnetServices";
import { mnetHost2servicesRouter } from "./mnetHost2services";
import { mnetLogsRouter } from "./mnetLogs";
import { mnetRemoteRpcRouter } from "./mnetRemoteRpc";
import { mnetRemoteService2rpcsRouter } from "./mnetRemoteService2rpcs";
import { mnetRpcsRouter } from "./mnetRpcs";
import { mnetService2rpcsRouter } from "./mnetService2rpcs";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  mnetApplications: mnetApplicationsRouter,
  mnetHosts: mnetHostsRouter,
  mnetServiceEnrolEnrolments: mnetServiceEnrolEnrolmentsRouter,
  mnetServiceEnrolCourses: mnetServiceEnrolCoursesRouter,
  mnetSsoAccessControls: mnetSsoAccessControlsRouter,
  mnetSessions: mnetSessionsRouter,
  mnetServices: mnetServicesRouter,
  mnetHost2services: mnetHost2servicesRouter,
  mnetLogs: mnetLogsRouter,
  mnetRemoteRpc: mnetRemoteRpcRouter,
  mnetRemoteService2rpcs: mnetRemoteService2rpcsRouter,
  mnetRpcs: mnetRpcsRouter,
  mnetService2rpcs: mnetService2rpcsRouter,
