import {
  customFieldFieldIdSchema,
  insertCustomFieldFieldParams,
  updateCustomFieldFieldParams,
} from "@soco/custom-field-db/schema/customFieldFields";

import {
  createCustomFieldField,
  deleteCustomFieldField,
  updateCustomFieldField,
} from "../api/customFieldFields/mutations";
import {
  getCustomFieldFieldById,
  getCustomFieldFields,
} from "../api/customFieldFields/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const customFieldFieldsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getCustomFieldFields: publicProcedure.query(async () => {
      return getCustomFieldFields();
    }),
    getCustomFieldFieldById: publicProcedure
      .input(customFieldFieldIdSchema)
      .query(async ({ input }) => {
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
