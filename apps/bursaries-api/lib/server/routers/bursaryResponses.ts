import { getBursaryResponseById, getBursaryResponses } from "@/lib/api/bursaryResponses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  bursaryResponseIdSchema,
  insertBursaryResponseParams,
  updateBursaryResponseParams,
} from "@/lib/db/schema/bursaryResponses";
import { createBursaryResponse, deleteBursaryResponse, updateBursaryResponse } from "@/lib/api/bursaryResponses/mutations";

export const bursaryResponsesRouter = router({
  getBursaryResponses: publicProcedure.query(async () => {
    return getBursaryResponses();
  }),
  getBursaryResponseById: publicProcedure.input(bursaryResponseIdSchema).query(async ({ input }) => {
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
