import {
  createMnetServiceEnrolEnrolment,
  deleteMnetServiceEnrolEnrolment,
  updateMnetServiceEnrolEnrolment,
} from "../api/mnetServiceEnrolEnrolments/mutations";
import {
  getMnetServiceEnrolEnrolmentById,
  getMnetServiceEnrolEnrolments,
} from "../api/mnetServiceEnrolEnrolments/queries";
import {
  insertMnetServiceEnrolEnrolmentParams,
  mnetServiceEnrolEnrolmentIdSchema,
  updateMnetServiceEnrolEnrolmentParams,
} from "../db/schema/mnetServiceEnrolEnrolments";
import { publicProcedure, router } from "../server/trpc";

export const mnetServiceEnrolEnrolmentsRouter = router({
  getMnetServiceEnrolEnrolments: publicProcedure.query(async () => {
    return getMnetServiceEnrolEnrolments();
  }),
  getMnetServiceEnrolEnrolmentById: publicProcedure
    .input(mnetServiceEnrolEnrolmentIdSchema)
    .query(async ({ input }) => {
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
