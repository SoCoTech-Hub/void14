import { getDistrictById, getDistricts } from "@/lib/api/districts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  districtIdSchema,
  insertDistrictParams,
  updateDistrictParams,
} from "@/lib/db/schema/districts";
import { createDistrict, deleteDistrict, updateDistrict } from "@/lib/api/districts/mutations";

export const districtsRouter = router({
  getDistricts: publicProcedure.query(async () => {
    return getDistricts();
  }),
  getDistrictById: publicProcedure.input(districtIdSchema).query(async ({ input }) => {
    return getDistrictById(input.id);
  }),
  createDistrict: publicProcedure
    .input(insertDistrictParams)
    .mutation(async ({ input }) => {
      return createDistrict(input);
    }),
  updateDistrict: publicProcedure
    .input(updateDistrictParams)
    .mutation(async ({ input }) => {
      return updateDistrict(input.id, input);
    }),
  deleteDistrict: publicProcedure
    .input(districtIdSchema)
    .mutation(async ({ input }) => {
      return deleteDistrict(input.id);
    }),
});
