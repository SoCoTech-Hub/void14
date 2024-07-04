import {
  createQualificationsResponse,
  deleteQualificationsResponse,
  updateQualificationsResponse,
} from "../api/qualificationsResponses/mutations";
import {
  getQualificationsResponseById,
  getQualificationsResponses,
} from "../api/qualificationsResponses/queries";
import {
  insertQualificationsResponseParams,
  qualificationsResponseIdSchema,
  updateQualificationsResponseParams,
} from "../db/schema/qualificationsResponses";
import { publicProcedure, router } from "../server/trpc";

export const qualificationsResponsesRouter = router({
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
