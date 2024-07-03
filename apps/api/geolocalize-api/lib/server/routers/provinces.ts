import { getProvinceById, getProvinces } from "@/lib/api/provinces/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  provinceIdSchema,
  insertProvinceParams,
  updateProvinceParams,
} from "@/lib/db/schema/provinces";
import { createProvince, deleteProvince, updateProvince } from "@/lib/api/provinces/mutations";

export const provincesRouter = router({
  getProvinces: publicProcedure.query(async () => {
    return getProvinces();
  }),
  getProvinceById: publicProcedure.input(provinceIdSchema).query(async ({ input }) => {
    return getProvinceById(input.id);
  }),
  createProvince: publicProcedure
    .input(insertProvinceParams)
    .mutation(async ({ input }) => {
      return createProvince(input);
    }),
  updateProvince: publicProcedure
    .input(updateProvinceParams)
    .mutation(async ({ input }) => {
      return updateProvince(input.id, input);
    }),
  deleteProvince: publicProcedure
    .input(provinceIdSchema)
    .mutation(async ({ input }) => {
      return deleteProvince(input.id);
    }),
});
