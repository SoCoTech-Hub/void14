import {
  createCustomFieldData,
  deleteCustomFieldData,
  updateCustomFieldData,
} from "../api/customFieldDatas/mutations";
import {
  getCustomFieldDataById,
  getCustomFieldDatas,
} from "../api/customFieldDatas/queries";
import {
  customFieldDataIdSchema,
  insertCustomFieldDataParams,
  updateCustomFieldDataParams,
} from "../db/schema/customFieldDatas";
import { publicProcedure, router } from "../server/trpc";

export const customFieldDatasRouter = router({
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
