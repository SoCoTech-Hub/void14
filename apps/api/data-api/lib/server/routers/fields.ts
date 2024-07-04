import { createField, deleteField, updateField } from "../api/fields/mutations";
import { getFieldById, getFields } from "../api/fields/queries";
import {
  fieldIdSchema,
  insertFieldParams,
  updateFieldParams,
} from "../db/schema/fields";
import { publicProcedure, router } from "../server/trpc";

export const fieldsRouter = router({
  getFields: publicProcedure.query(async () => {
    return getFields();
  }),
  getFieldById: publicProcedure
    .input(fieldIdSchema)
    .query(async ({ input }) => {
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
