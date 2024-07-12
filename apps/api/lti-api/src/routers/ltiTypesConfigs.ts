import {
  insertLtiTypesConfigParams,
  ltiTypesConfigIdSchema,
  updateLtiTypesConfigParams,
} from "@soco/lti-db/schema/ltiTypesConfigs";

import {
  createLtiTypesConfig,
  deleteLtiTypesConfig,
  updateLtiTypesConfig,
} from "../api/ltiTypesConfigs/mutations";
import {
  getLtiTypesConfigById,
  getLtiTypesConfigs,
} from "../api/ltiTypesConfigs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ltiTypesConfigsRouter = createTRPCRouter({
  getLtiTypesConfigs: publicProcedure.query(async () => {
    return getLtiTypesConfigs();
  }),
  getLtiTypesConfigById: publicProcedure
    .input(ltiTypesConfigIdSchema)
    .query(async ({ input }) => {
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
