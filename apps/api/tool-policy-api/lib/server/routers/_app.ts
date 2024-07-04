import { router } from "../server/trpc";
import { toolPoliciesRouter } from "./toolPolicies";
import { toolPolicyAcceptancesRouter } from "./toolPolicyAcceptances";
import { toolPolicyVersionsRouter } from "./toolPolicyVersions";

export const appRouter = router({
  toolPolicies: toolPoliciesRouter,
  toolPolicyAcceptances: toolPolicyAcceptancesRouter,
  toolPolicyVersions: toolPolicyVersionsRouter,
});

export type AppRouter = typeof appRouter;
