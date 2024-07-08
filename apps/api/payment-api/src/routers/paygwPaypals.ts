import { getPaygwPaypalById, getPaygwPaypals } from "../api/paygwPaypals/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  paygwPaypalIdSchema,
  insertPaygwPaypalParams,
  updatePaygwPaypalParams,
} from "@soco/payment-db/schema/paygwPaypals";
import { createPaygwPaypal, deletePaygwPaypal, updatePaygwPaypal } from "../api/paygwPaypals/mutations";

export const paygwPaypalsRouter =createTRPCRouter({
  getPaygwPaypals: publicProcedure.query(async () => {
    return getPaygwPaypals();
  }),
  getPaygwPaypalById: publicProcedure.input(paygwPaypalIdSchema).query(async ({ input }) => {
    return getPaygwPaypalById(input.id);
  }),
  createPaygwPaypal: publicProcedure
    .input(insertPaygwPaypalParams)
    .mutation(async ({ input }) => {
      return createPaygwPaypal(input);
    }),
  updatePaygwPaypal: publicProcedure
    .input(updatePaygwPaypalParams)
    .mutation(async ({ input }) => {
      return updatePaygwPaypal(input.id, input);
    }),
  deletePaygwPaypal: publicProcedure
    .input(paygwPaypalIdSchema)
    .mutation(async ({ input }) => {
      return deletePaygwPaypal(input.id);
    }),
});
