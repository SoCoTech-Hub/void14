import { getUserEnrolmentById, getUserEnrolments } from "@/lib/api/userEnrolments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userEnrolmentIdSchema,
  insertUserEnrolmentParams,
  updateUserEnrolmentParams,
} from "@/lib/db/schema/userEnrolments";
import { createUserEnrolment, deleteUserEnrolment, updateUserEnrolment } from "@/lib/api/userEnrolments/mutations";

export const userEnrolmentsRouter = router({
  getUserEnrolments: publicProcedure.query(async () => {
    return getUserEnrolments();
  }),
  getUserEnrolmentById: publicProcedure.input(userEnrolmentIdSchema).query(async ({ input }) => {
    return getUserEnrolmentById(input.id);
  }),
  createUserEnrolment: publicProcedure
    .input(insertUserEnrolmentParams)
    .mutation(async ({ input }) => {
      return createUserEnrolment(input);
    }),
  updateUserEnrolment: publicProcedure
    .input(updateUserEnrolmentParams)
    .mutation(async ({ input }) => {
      return updateUserEnrolment(input.id, input);
    }),
  deleteUserEnrolment: publicProcedure
    .input(userEnrolmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserEnrolment(input.id);
    }),
});
