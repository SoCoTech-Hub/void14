import {
  insertQualificationsResponseParams,
  qualificationsResponseIdSchema,
  updateQualificationsResponseParams,
} from "@soco/qualifications-db/schema/qualificationsResponses";

import {
  createQualificationsResponse,
  deleteQualificationsResponse,
  updateQualificationsResponse,
} from "../api/qualificationsResponses/mutations";
import {
  getQualificationsResponseById,
  getQualificationsResponses,
} from "../api/qualificationsResponses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const qualificationsResponsesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getQualificationsResponses: publicProcedure.query(async () => {
    return getQualificationsResponses();
  }),
  getQualificationsResponseById: publicProcedure
    .input(qualificationsResponseIdSchema)
    .query(async ({ input }) => {
      return getQualificationsResponseById(input.id);
    }),
  createQualificationsResponse: publicProcedure
    .input(insertQualificationsResponseParams)
    .mutation(async ({ input }) => {
      return createQualificationsResponse(input);
    }),
  updateQualificationsResponse: publicProcedure
    .input(updateQualificationsResponseParams)
    .mutation(async ({ input }) => {
      return updateQualificationsResponse(input.id, input);
    }),
  deleteQualificationsResponse: publicProcedure
    .input(qualificationsResponseIdSchema)
    .mutation(async ({ input }) => {
      return deleteQualificationsResponse(input.id);
    }),
});
