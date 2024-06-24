import { getRepositoryInstanceConfigById, getRepositoryInstanceConfigs } from "@/lib/api/repositoryInstanceConfigs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  repositoryInstanceConfigIdSchema,
  insertRepositoryInstanceConfigParams,
  updateRepositoryInstanceConfigParams,
} from "@/lib/db/schema/repositoryInstanceConfigs";
import { createRepositoryInstanceConfig, deleteRepositoryInstanceConfig, updateRepositoryInstanceConfig } from "@/lib/api/repositoryInstanceConfigs/mutations";

export const repositoryInstanceConfigsRouter = router({
  getRepositoryInstanceConfigs: publicProcedure.query(async () => {
    return getRepositoryInstanceConfigs();
  }),
  getRepositoryInstanceConfigById: publicProcedure.input(repositoryInstanceConfigIdSchema).query(async ({ input }) => {
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
