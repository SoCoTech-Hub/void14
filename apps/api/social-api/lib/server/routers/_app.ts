import { router } from "../server/trpc";
import { socialEmojisRouter } from "./socialEmojis";
import { socialLinksRouter } from "./socialLinks";
import { socialsRouter } from "./socials";
import { socialSharesRouter } from "./socialShares";

export const appRouter = router({
  socialEmojis: socialEmojisRouter,
  socialLinks: socialLinksRouter,
  socials: socialsRouter,
  socialShares: socialSharesRouter,
});

export type AppRouter = typeof appRouter;
