import { socialEmojisRouter } from './routers/socialEmojis';
import { socialLinksRouter } from './routers/socialLinks';
import { socialsRouter } from './routers/socials';
import { socialSharesRouter } from './routers/socialShares';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  socialEmojis: socialEmojisRouter,
  socialLinks: socialLinksRouter,
  socials: socialsRouter,
  socialShares: socialSharesRouter,
});

export type AppRouter = typeof appRouter;
