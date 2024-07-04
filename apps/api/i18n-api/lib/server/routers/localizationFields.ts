import {
  createLocalizationField,
  deleteLocalizationField,
  updateLocalizationField,
} from "../api/localizationFields/mutations";
import {
  getLocalizationFieldById,
  getLocalizationFields,
} from "../api/localizationFields/queries";
import {
  insertLocalizationFieldParams,
  localizationFieldIdSchema,
  updateLocalizationFieldParams,
} from "../db/schema/localizationFields";
import { publicProcedure, router } from "../server/trpc";

export const localizationFieldsRouter = router({
  getLocalizationFields: publicProcedure.query(async () => {
    return getLocalizationFields();
  }),
  getLocalizationFieldById: publicProcedure
    .input(localizationFieldIdSchema)
    .query(async ({ input }) => {
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
