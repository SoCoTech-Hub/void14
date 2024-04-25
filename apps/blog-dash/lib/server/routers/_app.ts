import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { blogsRouter } from "./blogs";
import { socialIconsRouter } from "./socialIcons";
import { socialReactionsRouter } from "./socialReactions";
import { blogCommentsRouter } from "./blogComments";
import { blogExternalsRouter } from "./blogExternals";
import { blogAssociationsRouter } from "./blogAssociations";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  blogs: blogsRouter,
  socialIcons: socialIconsRouter,
  socialReactions: socialReactionsRouter,
  blogComments: blogCommentsRouter,
  blogExternals: blogExternalsRouter,
  blogAssociations: blogAssociationsRouter,
});

export type AppRouter = typeof appRouter;
