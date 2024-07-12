import {
  insertProvinceParams,
  provinceIdSchema,
  updateProvinceParams,
} from "@soco/geolocalize-db/schema/provinces";

import {
  createProvince,
  deleteProvince,
  updateProvince,
} from "../api/provinces/mutations";
import { getProvinceById, getProvinces } from "../api/provinces/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const provincesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getProvinces: publicProcedure.query(async () => {
      return getProvinces();
    }),
    getProvinceById: publicProcedure
      .input(provinceIdSchema)
      .query(async ({ input }) => {
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
