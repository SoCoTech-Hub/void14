import { router } from "../server/trpc";
import { accountRouter } from "./account";
import { blogAssociationsRouter } from "./blogAssociations";
import { blogCommentsRouter } from "./blogComments";
import { blogExternalsRouter } from "./blogExternals";
import { blogsRouter } from "./blogs";
import { computersRouter } from "./computers";
import { socialIconsRouter } from "./socialIcons";
import { socialReactionsRouter } from "./socialReactions";

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
