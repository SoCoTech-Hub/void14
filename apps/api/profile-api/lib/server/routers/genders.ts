import {
  createGender,
  deleteGender,
  updateGender,
} from "../api/genders/mutations";
import { getGenderById, getGenders } from "../api/genders/queries";
import {
  genderIdSchema,
  insertGenderParams,
  updateGenderParams,
} from "../db/schema/genders";
import { publicProcedure, router } from "../server/trpc";

export const gendersRouter = router({
  getGenders: publicProcedure.query(async () => {
    return getGenders();
  }),
  getGenderById: publicProcedure
    .input(genderIdSchema)
    .query(async ({ input }) => {
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
