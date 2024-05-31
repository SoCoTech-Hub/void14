import { getEnrolPaypalById, getEnrolPaypals } from "@/lib/api/enrolPaypals/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolPaypalIdSchema,
  insertEnrolPaypalParams,
  updateEnrolPaypalParams,
} from "@/lib/db/schema/enrolPaypals";
import { createEnrolPaypal, deleteEnrolPaypal, updateEnrolPaypal } from "@/lib/api/enrolPaypals/mutations";

export const enrolPaypalsRouter = router({
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
