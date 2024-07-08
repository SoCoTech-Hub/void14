import { getUserEnrolmentById, getUserEnrolments } from "../api/userEnrolments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  userEnrolmentIdSchema,
  insertUserEnrolmentParams,
  updateUserEnrolmentParams,
} from "@soco/user-db/schema/userEnrolments";
import { createUserEnrolment, deleteUserEnrolment, updateUserEnrolment } from "../api/userEnrolments/mutations";

export const userEnrolmentsRouter =createTRPCRouter({
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
