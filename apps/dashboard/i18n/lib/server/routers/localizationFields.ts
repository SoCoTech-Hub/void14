import { getLocalizationFieldById, getLocalizationFields } from "@/lib/api/localizationFields/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  localizationFieldIdSchema,
  insertLocalizationFieldParams,
  updateLocalizationFieldParams,
} from "@/lib/db/schema/localizationFields";
import { createLocalizationField, deleteLocalizationField, updateLocalizationField } from "@/lib/api/localizationFields/mutations";

export const localizationFieldsRouter = router({
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
