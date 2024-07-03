import { getMnetServiceEnrolEnrolmentById, getMnetServiceEnrolEnrolments } from "@/lib/api/mnetServiceEnrolEnrolments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetServiceEnrolEnrolmentIdSchema,
  insertMnetServiceEnrolEnrolmentParams,
  updateMnetServiceEnrolEnrolmentParams,
} from "@/lib/db/schema/mnetServiceEnrolEnrolments";
import { createMnetServiceEnrolEnrolment, deleteMnetServiceEnrolEnrolment, updateMnetServiceEnrolEnrolment } from "@/lib/api/mnetServiceEnrolEnrolments/mutations";

export const mnetServiceEnrolEnrolmentsRouter = router({
  getMnetServiceEnrolEnrolments: publicProcedure.query(async () => {
    return getMnetServiceEnrolEnrolments();
  }),
  getMnetServiceEnrolEnrolmentById: publicProcedure.input(mnetServiceEnrolEnrolmentIdSchema).query(async ({ input }) => {
    return getMnetServiceEnrolEnrolmentById(input.id);
  }),
  createMnetServiceEnrolEnrolment: publicProcedure
    .input(insertMnetServiceEnrolEnrolmentParams)
    .mutation(async ({ input }) => {
      return createMnetServiceEnrolEnrolment(input);
    }),
  updateMnetServiceEnrolEnrolment: publicProcedure
    .input(updateMnetServiceEnrolEnrolmentParams)
    .mutation(async ({ input }) => {
      return updateMnetServiceEnrolEnrolment(input.id, input);
    }),
  deleteMnetServiceEnrolEnrolment: publicProcedure
    .input(mnetServiceEnrolEnrolmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetServiceEnrolEnrolment(input.id);
    }),
});
