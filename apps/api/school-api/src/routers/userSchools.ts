import {
  insertUserSchoolParams,
  updateUserSchoolParams,
  userSchoolIdSchema,
} from "@soco/school-db/schema/userSchools";

import {
  createUserSchool,
  deleteUserSchool,
  updateUserSchool,
} from "../api/userSchools/mutations";
import { getUserSchoolById, getUserSchools } from "../api/userSchools/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userSchoolsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getUserSchools: publicProcedure.query(async () => {
      return getUserSchools();
    }),
    getUserSchoolById: publicProcedure
      .input(userSchoolIdSchema)
      .query(async ({ input }) => {
        return getUserSchoolById(input.id);
      }),
    createUserSchool: publicProcedure
      .input(insertUserSchoolParams)
      .mutation(async ({ input }) => {
        return createUserSchool(input);
      }),
    updateUserSchool: publicProcedure
      .input(updateUserSchoolParams)
      .mutation(async ({ input }) => {
        return updateUserSchool(input.id, input);
      }),
    deleteUserSchool: publicProcedure
      .input(userSchoolIdSchema)
      .mutation(async ({ input }) => {
        return deleteUserSchool(input.id);
      }),
  });
