import {
  createBursaryResponse,
  deleteBursaryResponse,
  updateBursaryResponse,
} from "../api/bursaryResponses/mutations";
import {
  getBursaryResponseById,
  getBursaryResponses,
} from "../api/bursaryResponses/queries";
import {
  bursaryResponseIdSchema,
  insertBursaryResponseParams,
  updateBursaryResponseParams,
} from "../db/schema/bursaryResponses";
import { publicProcedure, router } from "../server/trpc";

export const bursaryResponsesRouter = router({
  getBursaryResponses: publicProcedure.query(async () => {
    return getBursaryResponses();
  }),
  getBursaryResponseById: publicProcedure
    .input(bursaryResponseIdSchema)
    .query(async ({ input }) => {
      return getBursaryResponseById(input.id);
    }),
  createBursaryResponse: publicProcedure
    .input(insertBursaryResponseParams)
    .mutation(async ({ input }) => {
      return createBursaryResponse(input);
    }),
  updateBursaryResponse: publicProcedure
    .input(updateBursaryResponseParams)
    .mutation(async ({ input }) => {
      return updateBursaryResponse(input.id, input);
    }),
  deleteBursaryResponse: publicProcedure
    .input(bursaryResponseIdSchema)
    .mutation(async ({ input }) => {
      return deleteBursaryResponse(input.id);
    }),
});
