import { getGenderById, getGenders } from "@/lib/api/genders/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  genderIdSchema,
  insertGenderParams,
  updateGenderParams,
} from "@/lib/db/schema/genders";
import { createGender, deleteGender, updateGender } from "@/lib/api/genders/mutations";

export const gendersRouter = router({
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
