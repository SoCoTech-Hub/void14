import {
  insertRepositoryInstanceConfigParams,
  repositoryInstanceConfigIdSchema,
  updateRepositoryInstanceConfigParams,
} from "@soco/repository-db/schema/repositoryInstanceConfigs";

import {
  createRepositoryInstanceConfig,
  deleteRepositoryInstanceConfig,
  updateRepositoryInstanceConfig,
} from "../api/repositoryInstanceConfigs/mutations";
import {
  getRepositoryInstanceConfigById,
  getRepositoryInstanceConfigs,
} from "../api/repositoryInstanceConfigs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const repositoryInstanceConfigsRouter = createTRPCRouter({
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
