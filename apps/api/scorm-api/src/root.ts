import { scormAiccSessionsRouter } from "./routers/scormAiccSessions";
import { scormsRouter } from "./routers/scorms";
import { scormScoesRouter } from "./routers/scormScoes";
import { scormScoesDatasRouter } from "./routers/scormScoesDatas";
import { scormScoesTracksRouter } from "./routers/scormScoesTracks";
import { scormSeqMapinfosRouter } from "./routers/scormSeqMapinfos";
import { scormSeqObjectivesRouter } from "./routers/scormSeqObjectives";
import { scormSeqRollupRuleCondsRouter } from "./routers/scormSeqRollupRuleConds";
import { scormSeqRollupRulesRouter } from "./routers/scormSeqRollupRules";
import { scormSeqRuleConditionsRouter } from "./routers/scormSeqRuleConditions";
import { scormSeqRuleCondsRouter } from "./routers/scormSeqRuleConds";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  scormAiccSessions: scormAiccSessionsRouter,
  scorms: scormsRouter,
  scormScoes: scormScoesRouter,
  scormScoesDatas: scormScoesDatasRouter,
  scormScoesTracks: scormScoesTracksRouter,
  scormSeqMapinfos: scormSeqMapinfosRouter,
  scormSeqObjectives: scormSeqObjectivesRouter,
  scormSeqRollupRuleConds: scormSeqRollupRuleCondsRouter,
  scormSeqRollupRules: scormSeqRollupRulesRouter,
  scormSeqRuleConditions: scormSeqRuleConditionsRouter,
  scormSeqRuleConds: scormSeqRuleCondsRouter,
});

export type AppRouter = typeof appRouter;
