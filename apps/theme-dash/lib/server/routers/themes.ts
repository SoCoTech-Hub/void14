import { getThemeById, getThemes } from "@/lib/api/themes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  themeIdSchema,
  insertThemeParams,
  updateThemeParams,
} from "@/lib/db/schema/themes";
import { createTheme, deleteTheme, updateTheme } from "@/lib/api/themes/mutations";

export const themesRouter = router({
  getThemes: publicProcedure.query(async () => {
    return getThemes();
  }),
  getThemeById: publicProcedure.input(themeIdSchema).query(async ({ input }) => {
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
