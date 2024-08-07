import { accountRouter } from "./routers/account";
import { blogAssociationsRouter } from "./routers/blogAssociations";
import { blogCommentsRouter } from "./routers/blogComments";
import { blogExternalsRouter } from "./routers/blogExternals";
import { blogsRouter } from "./routers/blogs";
import { socialIconsRouter } from "./routers/socialIcons";
import { socialReactionsRouter } from "./routers/socialReactions";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  account: accountRouter,
  blogAssociations: blogAssociationsRouter,
  blogComments: blogCommentsRouter,
  blogExternals: blogExternalsRouter,
  blogs: blogsRouter,
  socialIcons: socialIconsRouter,
  socialReactions: socialReactionsRouter,
});

export type AppRouter = typeof appRouter;
