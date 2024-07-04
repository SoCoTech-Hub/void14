import { router } from "../server/trpc";
import { toolDataprivacyCategoriesRouter } from "./toolDataprivacyCategories";
import { toolDataprivacyCtxExpiredsRouter } from "./toolDataprivacyCtxExpireds";
import { toolDataprivacyCtxInstancesRouter } from "./toolDataprivacyCtxInstances";
import { toolDataprivacyCtxLevelsRouter } from "./toolDataprivacyCtxLevels";
import { toolDataprivacyPurposeRolesRouter } from "./toolDataprivacyPurposeRoles";
import { toolDataprivacyPurposesRouter } from "./toolDataprivacyPurposes";
import { toolDataprivacyRequestsRouter } from "./toolDataprivacyRequests";

export const appRouter = router({
  toolDataprivacyCategories: toolDataprivacyCategoriesRouter,
  toolDataprivacyCtxExpireds: toolDataprivacyCtxExpiredsRouter,
  toolDataprivacyCtxInstances: toolDataprivacyCtxInstancesRouter,
  toolDataprivacyCtxLevels: toolDataprivacyCtxLevelsRouter,
  toolDataprivacyPurposes: toolDataprivacyPurposesRouter,
  toolDataprivacyPurposeRoles: toolDataprivacyPurposeRolesRouter,
  toolDataprivacyRequests: toolDataprivacyRequestsRouter,
});

export type AppRouter = typeof appRouter;
