import {
  createDistrict,
  deleteDistrict,
  updateDistrict,
} from "../api/districts/mutations";
import { getDistrictById, getDistricts } from "../api/districts/queries";
import {
  districtIdSchema,
  insertDistrictParams,
  updateDistrictParams,
} from "../db/schema/districts";
import { publicProcedure, router } from "../server/trpc";

export const districtsRouter = router({
  getDistricts: publicProcedure.query(async () => {
    return getDistricts();
  }),
  getDistrictById: publicProcedure
    .input(districtIdSchema)
    .query(async ({ input }) => {
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
