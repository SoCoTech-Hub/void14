import { getRepositoryOnedriveAccessById, getRepositoryOnedriveAccesses } from "@/lib/api/repositoryOnedriveAccesses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  repositoryOnedriveAccessIdSchema,
  insertRepositoryOnedriveAccessParams,
  updateRepositoryOnedriveAccessParams,
} from "@/lib/db/schema/repositoryOnedriveAccesses";
import { createRepositoryOnedriveAccess, deleteRepositoryOnedriveAccess, updateRepositoryOnedriveAccess } from "@/lib/api/repositoryOnedriveAccesses/mutations";

export const repositoryOnedriveAccessesRouter = router({
  getRepositoryOnedriveAccesses: publicProcedure.query(async () => {
    return getRepositoryOnedriveAccesses();
  }),
  getRepositoryOnedriveAccessById: publicProcedure.input(repositoryOnedriveAccessIdSchema).query(async ({ input }) => {
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
