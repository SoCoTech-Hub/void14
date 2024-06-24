import { getConfigById, getConfigs } from "@/lib/api/configs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  configIdSchema,
  insertConfigParams,
  updateConfigParams,
} from "@/lib/db/schema/configs";
import { createConfig, deleteConfig, updateConfig } from "@/lib/api/configs/mutations";

export const configsRouter = router({
  getConfigs: publicProcedure.query(async () => {
    return getConfigs();
  }),
  getConfigById: publicProcedure.input(configIdSchema).query(async ({ input }) => {
    return getConfigById(input.id);
  }),
  createConfig: publicProcedure
    .input(insertConfigParams)
    .mutation(async ({ input }) => {
      return createConfig(input);
    }),
  updateConfig: publicProcedure
    .input(updateConfigParams)
    .mutation(async ({ input }) => {
      return updateConfig(input.id, input);
    }),
  deleteConfig: publicProcedure
    .input(configIdSchema)
    .mutation(async ({ input }) => {
      return deleteConfig(input.id);
    }),
});
