import { createTRPCRouter } from "./trpc";

import { toolDataprivacyCategoriesRouter } from './routers/toolDataprivacyCategories';
import { toolDataprivacyCtxExpiredsRouter } from './routers/toolDataprivacyCtxExpireds';
import { toolDataprivacyCtxInstancesRouter } from './routers/toolDataprivacyCtxInstances';
import { toolDataprivacyCtxLevelsRouter } from './routers/toolDataprivacyCtxLevels';
import { toolDataprivacyPurposeRolesRouter } from './routers/toolDataprivacyPurposeRoles';
import { toolDataprivacyPurposesRouter } from './routers/toolDataprivacyPurposes';
import { toolDataprivacyRequestsRouter } from './routers/toolDataprivacyRequests';

export const appRouter = createTRPCRouter({
  toolDataprivacyCategories: toolDataprivacyCategoriesRouter,
  toolDataprivacyCtxExpireds: toolDataprivacyCtxExpiredsRouter,
  toolDataprivacyCtxInstances: toolDataprivacyCtxInstancesRouter,
  toolDataprivacyCtxLevels: toolDataprivacyCtxLevelsRouter,
  toolDataprivacyPurposeRoles: toolDataprivacyPurposeRolesRouter,
  toolDataprivacyPurposes: toolDataprivacyPurposesRouter,
  toolDataprivacyRequests: toolDataprivacyRequestsRouter,
});

export type AppRouter = typeof appRouter;
