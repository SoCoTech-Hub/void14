import { createTheme, deleteTheme, updateTheme } from "../api/themes/mutations";
import { getThemeById, getThemes } from "../api/themes/queries";
import {
  insertThemeParams,
  themeIdSchema,
  updateThemeParams,
} from "../db/schema/themes";
import { publicProcedure, router } from "../server/trpc";

export const themesRouter = router({
  getThemes: publicProcedure.query(async () => {
    return getThemes();
  }),
  getThemeById: publicProcedure
    .input(themeIdSchema)
    .query(async ({ input }) => {
      return getThemeById(input.id);
    }),
  createTheme: publicProcedure
    .input(insertThemeParams)
    .mutation(async ({ input }) => {
      return createTheme(input);
    }),
  updateTheme: publicProcedure
    .input(updateThemeParams)
    .mutation(async ({ input }) => {
      return updateTheme(input.id, input);
    }),
  deleteTheme: publicProcedure
    .input(themeIdSchema)
    .mutation(async ({ input }) => {
      return deleteTheme(input.id);
    }),
});
