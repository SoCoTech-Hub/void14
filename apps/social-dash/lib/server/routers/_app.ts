import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { socialLinksRouter } from "./socialLinks";
import { socialSharesRouter } from "./socialShares";
import { socialsRouter } from "./socials";
import { socialEmojisRouter } from "./socialEmojis";

export const appRouter = router({
  computers: computersRouter,
  socialLinks: socialLinksRouter,
  socialShares: socialSharesRouter,
  socials: socialsRouter,
  socialEmojis: socialEmojisRouter,
});

export type AppRouter = typeof appRouter;
