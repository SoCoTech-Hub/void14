import {
  createRepositoryInstanceConfig,
  deleteRepositoryInstanceConfig,
  updateRepositoryInstanceConfig,
} from "../api/repositoryInstanceConfigs/mutations";
import {
  getRepositoryInstanceConfigById,
  getRepositoryInstanceConfigs,
} from "../api/repositoryInstanceConfigs/queries";
import {
  insertRepositoryInstanceConfigParams,
  repositoryInstanceConfigIdSchema,
  updateRepositoryInstanceConfigParams,
} from "../db/schema/repositoryInstanceConfigs";
import { publicProcedure, router } from "../server/trpc";

export const repositoryInstanceConfigsRouter = router({
  getRepositoryInstanceConfigs: publicProcedure.query(async () => {
    return getRepositoryInstanceConfigs();
  }),
  getRepositoryInstanceConfigById: publicProcedure
    .input(repositoryInstanceConfigIdSchema)
    .query(async ({ input }) => {
      return getRepositoryInstanceConfigById(input.id);
    }),
  createRepositoryInstanceConfig: publicProcedure
    .input(insertRepositoryInstanceConfigParams)
    .mutation(async ({ input }) => {
      return createRepositoryInstanceConfig(input);
    }),
  updateRepositoryInstanceConfig: publicProcedure
    .input(updateRepositoryInstanceConfigParams)
    .mutation(async ({ input }) => {
      return updateRepositoryInstanceConfig(input.id, input);
    }),
  deleteRepositoryInstanceConfig: publicProcedure
    .input(repositoryInstanceConfigIdSchema)
    .mutation(async ({ input }) => {
      return deleteRepositoryInstanceConfig(input.id);
    }),
});
