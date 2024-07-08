import { getFieldById, getFields } from "../api/fields/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  fieldIdSchema,
  insertFieldParams,
  updateFieldParams,
} from "@soco/data-db/schema/fields";
import { createField, deleteField, updateField } from "../api/fields/mutations";

export const fieldsRouter =createTRPCRouter({
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
