import { router } from "../server/trpc";
import { badgeAlignmentsRouter } from "./badgeAlignments";
import { badgeBackpackOauth2sRouter } from "./badgeBackpackOauth2s";
import { badgeBackpacksRouter } from "./badgeBackpacks";
import { badgeCriteriaMetsRouter } from "./badgeCriteriaMets";
import { badgeCriteriaParamsRouter } from "./badgeCriteriaParams";
import { badgeCriteriasRouter } from "./badgeCriterias";
import { badgeEndorsementsRouter } from "./badgeEndorsements";
import { badgeExternalBackpacksRouter } from "./badgeExternalBackpacks";
import { badgeExternalIdentifiersRouter } from "./badgeExternalIdentifiers";
import { badgeExternalsRouter } from "./badgeExternals";
import { badgeIssuesRouter } from "./badgeIssues";
import { badgeManualAwardsRouter } from "./badgeManualAwards";
import { badgeRelatedsRouter } from "./badgeRelateds";
import { badgesRouter } from "./badges";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  badges: badgesRouter,
  badgeAlignments: badgeAlignmentsRouter,
  badgeBackpacks: badgeBackpacksRouter,
  badgeBackpackOauth2s: badgeBackpackOauth2sRouter,
  badgeCriterias: badgeCriteriasRouter,
  badgeCriteriaMets: badgeCriteriaMetsRouter,
  badgeCriteriaParams: badgeCriteriaParamsRouter,
  badgeEndorsements: badgeEndorsementsRouter,
  badgeExternals: badgeExternalsRouter,
  badgeExternalBackpacks: badgeExternalBackpacksRouter,
  badgeExternalIdentifiers: badgeExternalIdentifiersRouter,
  badgeIssues: badgeIssuesRouter,
  badgeManualAwards: badgeManualAwardsRouter,
  badgeRelateds: badgeRelatedsRouter,
});

export type AppRouter = typeof appRouter;
