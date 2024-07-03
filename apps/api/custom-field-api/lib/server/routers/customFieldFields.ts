import { getCustomFieldFieldById, getCustomFieldFields } from "@/lib/api/customFieldFields/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  customFieldFieldIdSchema,
  insertCustomFieldFieldParams,
  updateCustomFieldFieldParams,
} from "@/lib/db/schema/customFieldFields";
import { createCustomFieldField, deleteCustomFieldField, updateCustomFieldField } from "@/lib/api/customFieldFields/mutations";

export const customFieldFieldsRouter = router({
  getCustomFieldFields: publicProcedure.query(async () => {
    return getCustomFieldFields();
  }),
  getCustomFieldFieldById: publicProcedure.input(customFieldFieldIdSchema).query(async ({ input }) => {
    return getCustomFieldFieldById(input.id);
  }),
  createCustomFieldField: publicProcedure
    .input(insertCustomFieldFieldParams)
    .mutation(async ({ input }) => {
      return createCustomFieldField(input);
    }),
  updateCustomFieldField: publicProcedure
    .input(updateCustomFieldFieldParams)
    .mutation(async ({ input }) => {
      return updateCustomFieldField(input.id, input);
    }),
  deleteCustomFieldField: publicProcedure
    .input(customFieldFieldIdSchema)
    .mutation(async ({ input }) => {
      return deleteCustomFieldField(input.id);
    }),
});
