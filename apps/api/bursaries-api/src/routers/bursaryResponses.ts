import { getBursaryResponseById, getBursaryResponses } from "../api/bursaryResponses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  bursaryResponseIdSchema,
  insertBursaryResponseParams,
  updateBursaryResponseParams,
} from "@soco/bursaries-db/schema/bursaryResponses";
import { createBursaryResponse, deleteBursaryResponse, updateBursaryResponse } from "../api/bursaryResponses/mutations";

export const bursaryResponsesRouter =createTRPCRouter({
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
