import { getQualificationsResponseById, getQualificationsResponses } from "@/lib/api/qualificationsResponses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  qualificationsResponseIdSchema,
  insertQualificationsResponseParams,
  updateQualificationsResponseParams,
} from "@/lib/db/schema/qualificationsResponses";
import { createQualificationsResponse, deleteQualificationsResponse, updateQualificationsResponse } from "@/lib/api/qualificationsResponses/mutations";

export const qualificationsResponsesRouter = router({
  getQualificationsResponses: publicProcedure.query(async () => {
    return getQualificationsResponses();
  }),
  getQualificationsResponseById: publicProcedure.input(qualificationsResponseIdSchema).query(async ({ input }) => {
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
