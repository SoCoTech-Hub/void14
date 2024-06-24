import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { badgesRouter } from "./badges";
import { badgeAlignmentsRouter } from "./badgeAlignments";
import { badgeBackpacksRouter } from "./badgeBackpacks";
import { badgeBackpackOauth2sRouter } from "./badgeBackpackOauth2s";
import { badgeCriteriasRouter } from "./badgeCriterias";
import { badgeCriteriaMetsRouter } from "./badgeCriteriaMets";
import { badgeCriteriaParamsRouter } from "./badgeCriteriaParams";
import { badgeEndorsementsRouter } from "./badgeEndorsements";
import { badgeExternalsRouter } from "./badgeExternals";
import { badgeExternalBackpacksRouter } from "./badgeExternalBackpacks";
import { badgeExternalIdentifiersRouter } from "./badgeExternalIdentifiers";
import { badgeIssuesRouter } from "./badgeIssues";
import { badgeManualAwardsRouter } from "./badgeManualAwards";
import { badgeRelatedsRouter } from "./badgeRelateds";

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
