import { badgeAlignmentsRouter } from './routers/badgeAlignments';
import { badgeBackpackOauth2sRouter } from './routers/badgeBackpackOauth2s';
import { badgeBackpacksRouter } from './routers/badgeBackpacks';
import { badgeCriteriaMetsRouter } from './routers/badgeCriteriaMets';
import { badgeCriteriaParamsRouter } from './routers/badgeCriteriaParams';
import { badgeCriteriasRouter } from './routers/badgeCriterias';
import { badgeEndorsementsRouter } from './routers/badgeEndorsements';
import { badgeExternalBackpacksRouter } from './routers/badgeExternalBackpacks';
import { badgeExternalIdentifiersRouter } from './routers/badgeExternalIdentifiers';
import { badgeExternalsRouter } from './routers/badgeExternals';
import { badgeIssuesRouter } from './routers/badgeIssues';
import { badgeManualAwardsRouter } from './routers/badgeManualAwards';
import { badgeRelatedsRouter } from './routers/badgeRelateds';
import { badgesRouter } from './routers/badges';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  badgeAlignments: badgeAlignmentsRouter,
  badgeBackpackOauth2s: badgeBackpackOauth2sRouter,
  badgeBackpacks: badgeBackpacksRouter,
  badgeCriteriaMets: badgeCriteriaMetsRouter,
  badgeCriteriaParams: badgeCriteriaParamsRouter,
  badgeCriterias: badgeCriteriasRouter,
  badgeEndorsements: badgeEndorsementsRouter,
  badgeExternalBackpacks: badgeExternalBackpacksRouter,
  badgeExternalIdentifiers: badgeExternalIdentifiersRouter,
  badgeExternals: badgeExternalsRouter,
  badgeIssues: badgeIssuesRouter,
  badgeManualAwards: badgeManualAwardsRouter,
  badgeRelateds: badgeRelatedsRouter,
  badges: badgesRouter,
});

export type AppRouter = typeof appRouter;
