import {
  insertUserEnrolmentParams,
  updateUserEnrolmentParams,
  userEnrolmentIdSchema,
} from "@soco/user-db/schema/userEnrolments";

import {
  createUserEnrolment,
  deleteUserEnrolment,
  updateUserEnrolment,
} from "../api/userEnrolments/mutations";
import {
  getUserEnrolmentById,
  getUserEnrolments,
} from "../api/userEnrolments/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userEnrolmentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUserEnrolments: publicProcedure.query(async () => {
      return getUserEnrolments();
    }),
    getUserEnrolmentById: publicProcedure
      .input(userEnrolmentIdSchema)
      .query(async ({ input }) => {
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
