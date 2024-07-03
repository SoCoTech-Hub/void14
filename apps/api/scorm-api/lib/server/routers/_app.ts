import { router } from '@/lib/server/trpc'
import { scormsRouter } from './scorms'
import { scormScoesRouter } from "./scormScoes";
import { scormAiccSessionsRouter } from "./scormAiccSessions";
import { scormScoesDatasRouter } from "./scormScoesDatas";
import { scormScoesTracksRouter } from "./scormScoesTracks";
import { scormSeqObjectivesRouter } from "./scormSeqObjectives";
import { scormSeqMapinfosRouter } from "./scormSeqMapinfos";
import { scormSeqRollupRulesRouter } from "./scormSeqRollupRules";
import { scormSeqRollupRuleCondsRouter } from "./scormSeqRollupRuleConds";
import { scormSeqRuleCondsRouter } from "./scormSeqRuleConds";
import { scormSeqRuleConditionsRouter } from "./scormSeqRuleConditions";

export const appRouter = router({
	scorms: scormsRouter
})

export type AppRouter = typeof appRouter
  scormScoes: scormScoesRouter,
  scormAiccSessions: scormAiccSessionsRouter,
  scormScoesDatas: scormScoesDatasRouter,
  scormScoesTracks: scormScoesTracksRouter,
  scormSeqObjectives: scormSeqObjectivesRouter,
  scormSeqMapinfos: scormSeqMapinfosRouter,
  scormSeqRollupRules: scormSeqRollupRulesRouter,
  scormSeqRollupRuleConds: scormSeqRollupRuleCondsRouter,
  scormSeqRuleConds: scormSeqRuleCondsRouter,
  scormSeqRuleConditions: scormSeqRuleConditionsRouter,
