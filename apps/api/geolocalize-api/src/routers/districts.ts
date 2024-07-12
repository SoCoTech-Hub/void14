import {
  districtIdSchema,
  insertDistrictParams,
  updateDistrictParams,
} from "@soco/geolocalize-db/schema/districts";

import {
  createDistrict,
  deleteDistrict,
  updateDistrict,
} from "../api/districts/mutations";
import { getDistrictById, getDistricts } from "../api/districts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const districtsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
