import { getFieldById, getFields } from "@/lib/api/fields/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  fieldIdSchema,
  insertFieldParams,
  updateFieldParams,
} from "@/lib/db/schema/fields";
import { createField, deleteField, updateField } from "@/lib/api/fields/mutations";

export const fieldsRouter = router({
  getFields: publicProcedure.query(async () => {
    return getFields();
  }),
  getFieldById: publicProcedure.input(fieldIdSchema).query(async ({ input }) => {
    return getFieldById(input.id);
  }),
  createField: publicProcedure
    .input(insertFieldParams)
    .mutation(async ({ input }) => {
      return createField(input);
    }),
  updateField: publicProcedure
    .input(updateFieldParams)
    .mutation(async ({ input }) => {
      return updateField(input.id, input);
    }),
  deleteField: publicProcedure
    .input(fieldIdSchema)
    .mutation(async ({ input }) => {
      return deleteField(input.id);
    }),
});
