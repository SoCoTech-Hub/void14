import { getEnrolPaypalById, getEnrolPaypals } from "../api/enrolPaypals/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  enrolPaypalIdSchema,
  insertEnrolPaypalParams,
  updateEnrolPaypalParams,
} from "@soco/enrol-db/schema/enrolPaypals";
import { createEnrolPaypal, deleteEnrolPaypal, updateEnrolPaypal } from "../api/enrolPaypals/mutations";

export const enrolPaypalsRouter =createTRPCRouter({
  getEnrolPaypals: publicProcedure.query(async () => {
    return getEnrolPaypals();
  }),
  getEnrolPaypalById: publicProcedure.input(enrolPaypalIdSchema).query(async ({ input }) => {
    return getEnrolPaypalById(input.id);
  }),
  createEnrolPaypal: publicProcedure
    .input(insertEnrolPaypalParams)
    .mutation(async ({ input }) => {
      return createEnrolPaypal(input);
    }),
  updateEnrolPaypal: publicProcedure
    .input(updateEnrolPaypalParams)
    .mutation(async ({ input }) => {
      return updateEnrolPaypal(input.id, input);
    }),
  deleteEnrolPaypal: publicProcedure
    .input(enrolPaypalIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolPaypal(input.id);
    }),
});
