import {
  createRepositoryOnedriveAccess,
  deleteRepositoryOnedriveAccess,
  updateRepositoryOnedriveAccess,
} from "../api/repositoryOnedriveAccesses/mutations";
import {
  getRepositoryOnedriveAccessById,
  getRepositoryOnedriveAccesses,
} from "../api/repositoryOnedriveAccesses/queries";
import {
  insertRepositoryOnedriveAccessParams,
  repositoryOnedriveAccessIdSchema,
  updateRepositoryOnedriveAccessParams,
} from "../db/schema/repositoryOnedriveAccesses";
import { publicProcedure, router } from "../server/trpc";

export const repositoryOnedriveAccessesRouter = router({
  getRepositoryOnedriveAccesses: publicProcedure.query(async () => {
    return getRepositoryOnedriveAccesses();
  }),
  getRepositoryOnedriveAccessById: publicProcedure
    .input(repositoryOnedriveAccessIdSchema)
    .query(async ({ input }) => {
      return getRepositoryOnedriveAccessById(input.id);
    }),
  createRepositoryOnedriveAccess: publicProcedure
    .input(insertRepositoryOnedriveAccessParams)
    .mutation(async ({ input }) => {
      return createRepositoryOnedriveAccess(input);
    }),
  updateRepositoryOnedriveAccess: publicProcedure
    .input(updateRepositoryOnedriveAccessParams)
    .mutation(async ({ input }) => {
      return updateRepositoryOnedriveAccess(input.id, input);
    }),
  deleteRepositoryOnedriveAccess: publicProcedure
    .input(repositoryOnedriveAccessIdSchema)
    .mutation(async ({ input }) => {
      return deleteRepositoryOnedriveAccess(input.id);
    }),
});
