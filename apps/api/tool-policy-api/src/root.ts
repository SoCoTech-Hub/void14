import { toolPoliciesRouter } from './routers/toolPolicies';
import { toolPolicyAcceptancesRouter } from './routers/toolPolicyAcceptances';
import { toolPolicyVersionsRouter } from './routers/toolPolicyVersions';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  toolPolicies: toolPoliciesRouter,
  toolPolicyAcceptances: toolPolicyAcceptancesRouter,
  toolPolicyVersions: toolPolicyVersionsRouter,
});

export type AppRouter = typeof appRouter;
