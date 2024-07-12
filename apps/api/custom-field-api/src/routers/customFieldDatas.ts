import {
  customFieldDataIdSchema,
  insertCustomFieldDataParams,
  updateCustomFieldDataParams,
} from "@soco/custom-field-db/schema/customFieldDatas";

import {
  createCustomFieldData,
  deleteCustomFieldData,
  updateCustomFieldData,
} from "../api/customFieldDatas/mutations";
import {
  getCustomFieldDataById,
  getCustomFieldDatas,
} from "../api/customFieldDatas/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const customFieldDatasRouter = createTRPCRouter({
  getCustomFieldDatas: publicProcedure.query(async () => {
    return getCustomFieldDatas();
  }),
  getCustomFieldDataById: publicProcedure
    .input(customFieldDataIdSchema)
    .query(async ({ input }) => {
      return getCustomFieldDataById(input.id);
    }),
  createCustomFieldData: publicProcedure
    .input(insertCustomFieldDataParams)
    .mutation(async ({ input }) => {
      return createCustomFieldData(input);
    }),
  updateCustomFieldData: publicProcedure
    .input(updateCustomFieldDataParams)
    .mutation(async ({ input }) => {
      return updateCustomFieldData(input.id, input);
    }),
  deleteCustomFieldData: publicProcedure
    .input(customFieldDataIdSchema)
    .mutation(async ({ input }) => {
      return deleteCustomFieldData(input.id);
    }),
});
