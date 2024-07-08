import { createTRPCRouter } from "./trpc";

import { mnetApplicationsRouter } from './routers/mnetApplications';
import { mnetHost2servicesRouter } from './routers/mnetHost2services';
import { mnetHostsRouter } from './routers/mnetHosts';
import { mnetLogsRouter } from './routers/mnetLogs';
import { mnetRemoteRpcRouter } from './routers/mnetRemoteRpc';
import { mnetRemoteService2rpcsRouter } from './routers/mnetRemoteService2rpcs';
import { mnetRpcsRouter } from './routers/mnetRpcs';
import { mnetService2rpcsRouter } from './routers/mnetService2rpcs';
import { mnetServiceEnrolCoursesRouter } from './routers/mnetServiceEnrolCourses';
import { mnetServiceEnrolEnrolmentsRouter } from './routers/mnetServiceEnrolEnrolments';
import { mnetServicesRouter } from './routers/mnetServices';
import { mnetSessionsRouter } from './routers/mnetSessions';
import { mnetSsoAccessControlsRouter } from './routers/mnetSsoAccessControls';

export const appRouter = createTRPCRouter({
  mnetApplications: mnetApplicationsRouter,
  mnetHost2services: mnetHost2servicesRouter,
  mnetHosts: mnetHostsRouter,
  mnetLogs: mnetLogsRouter,
  mnetRemoteRpc: mnetRemoteRpcRouter,
  mnetRemoteService2rpcs: mnetRemoteService2rpcsRouter,
  mnetRpcs: mnetRpcsRouter,
  mnetService2rpcs: mnetService2rpcsRouter,
  mnetServiceEnrolCourses: mnetServiceEnrolCoursesRouter,
  mnetServiceEnrolEnrolments: mnetServiceEnrolEnrolmentsRouter,
  mnetServices: mnetServicesRouter,
  mnetSessions: mnetSessionsRouter,
  mnetSsoAccessControls: mnetSsoAccessControlsRouter,
});

export type AppRouter = typeof appRouter;
