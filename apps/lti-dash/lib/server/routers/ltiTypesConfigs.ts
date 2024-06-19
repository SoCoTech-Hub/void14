import { getLtiTypesConfigById, getLtiTypesConfigs } from "@/lib/api/ltiTypesConfigs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiTypesConfigIdSchema,
  insertLtiTypesConfigParams,
  updateLtiTypesConfigParams,
} from "@/lib/db/schema/ltiTypesConfigs";
import { createLtiTypesConfig, deleteLtiTypesConfig, updateLtiTypesConfig } from "@/lib/api/ltiTypesConfigs/mutations";

export const ltiTypesConfigsRouter = router({
  getLtiTypesConfigs: publicProcedure.query(async () => {
    return getLtiTypesConfigs();
  }),
  getLtiTypesConfigById: publicProcedure.input(ltiTypesConfigIdSchema).query(async ({ input }) => {
    return getLtiTypesConfigById(input.id);
  }),
  createLtiTypesConfig: publicProcedure
    .input(insertLtiTypesConfigParams)
    .mutation(async ({ input }) => {
      return createLtiTypesConfig(input);
    }),
  updateLtiTypesConfig: publicProcedure
    .input(updateLtiTypesConfigParams)
    .mutation(async ({ input }) => {
      return updateLtiTypesConfig(input.id, input);
    }),
  deleteLtiTypesConfig: publicProcedure
    .input(ltiTypesConfigIdSchema)
    .mutation(async ({ input }) => {
      return deleteLtiTypesConfig(input.id);
    }),
});
