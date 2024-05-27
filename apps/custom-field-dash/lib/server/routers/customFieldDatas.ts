import { getCustomFieldDataById, getCustomFieldDatas } from "@/lib/api/customFieldDatas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  customFieldDataIdSchema,
  insertCustomFieldDataParams,
  updateCustomFieldDataParams,
} from "@/lib/db/schema/customFieldDatas";
import { createCustomFieldData, deleteCustomFieldData, updateCustomFieldData } from "@/lib/api/customFieldDatas/mutations";

export const customFieldDatasRouter = router({
  getCustomFieldDatas: publicProcedure.query(async () => {
    return getCustomFieldDatas();
  }),
  getCustomFieldDataById: publicProcedure.input(customFieldDataIdSchema).query(async ({ input }) => {
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
