import { getGenderById, getGenders } from "../api/genders/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  genderIdSchema,
  insertGenderParams,
  updateGenderParams,
} from "@soco/profile-db/schema/genders";
import { createGender, deleteGender, updateGender } from "../api/genders/mutations";

export const gendersRouter =createTRPCRouter({
  getGenders: publicProcedure.query(async () => {
    return getGenders();
  }),
  getGenderById: publicProcedure.input(genderIdSchema).query(async ({ input }) => {
    return getGenderById(input.id);
  }),
  createGender: publicProcedure
    .input(insertGenderParams)
    .mutation(async ({ input }) => {
      return createGender(input);
    }),
  updateGender: publicProcedure
    .input(updateGenderParams)
    .mutation(async ({ input }) => {
      return updateGender(input.id, input);
    }),
  deleteGender: publicProcedure
    .input(genderIdSchema)
    .mutation(async ({ input }) => {
      return deleteGender(input.id);
    }),
});
