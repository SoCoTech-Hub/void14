import {
  insertLtiTypeParams,
  ltiTypeIdSchema,
  updateLtiTypeParams,
} from "@soco/lti-db/schema/ltiTypes";

import {
  createLtiType,
  deleteLtiType,
  updateLtiType,
} from "../api/ltiTypes/mutations";
import { getLtiTypeById, getLtiTypes } from "../api/ltiTypes/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ltiTypesRouter = createTRPCRouter({
  getLtiTypes: publicProcedure.query(async () => {
    return getLtiTypes();
  }),
  getLtiTypeById: publicProcedure
    .input(ltiTypeIdSchema)
    .query(async ({ input }) => {
      return getLtiTypeById(input.id);
    }),
  createLtiType: publicProcedure
    .input(insertLtiTypeParams)
    .mutation(async ({ input }) => {
      return createLtiType(input);
    }),
  updateLtiType: publicProcedure
    .input(updateLtiTypeParams)
    .mutation(async ({ input }) => {
      return updateLtiType(input.id, input);
    }),
  deleteLtiType: publicProcedure
    .input(ltiTypeIdSchema)
    .mutation(async ({ input }) => {
      return deleteLtiType(input.id);
    }),
});
