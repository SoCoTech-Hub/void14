import { getLocalizationFieldById, getLocalizationFields } from "../api/localizationFields/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  localizationFieldIdSchema,
  insertLocalizationFieldParams,
  updateLocalizationFieldParams,
} from "@soco/i18n-db/schema/localizationFields";
import { createLocalizationField, deleteLocalizationField, updateLocalizationField } from "../api/localizationFields/mutations";

export const localizationFieldsRouter =createTRPCRouter({
  getLocalizationFields: publicProcedure.query(async () => {
    return getLocalizationFields();
  }),
  getLocalizationFieldById: publicProcedure.input(localizationFieldIdSchema).query(async ({ input }) => {
    return getLocalizationFieldById(input.id);
  }),
  createLocalizationField: publicProcedure
    .input(insertLocalizationFieldParams)
    .mutation(async ({ input }) => {
      return createLocalizationField(input);
    }),
  updateLocalizationField: publicProcedure
    .input(updateLocalizationFieldParams)
    .mutation(async ({ input }) => {
      return updateLocalizationField(input.id, input);
    }),
  deleteLocalizationField: publicProcedure
    .input(localizationFieldIdSchema)
    .mutation(async ({ input }) => {
      return deleteLocalizationField(input.id);
    }),
});
