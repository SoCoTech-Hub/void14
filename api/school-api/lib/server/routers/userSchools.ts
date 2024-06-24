import { getUserSchoolById, getUserSchools } from "@/lib/api/userSchools/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userSchoolIdSchema,
  insertUserSchoolParams,
  updateUserSchoolParams,
} from "@/lib/db/schema/userSchools";
import { createUserSchool, deleteUserSchool, updateUserSchool } from "@/lib/api/userSchools/mutations";

export const userSchoolsRouter = router({
  getUserSchools: publicProcedure.query(async () => {
    return getUserSchools();
  }),
  getUserSchoolById: publicProcedure.input(userSchoolIdSchema).query(async ({ input }) => {
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
