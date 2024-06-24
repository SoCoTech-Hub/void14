import { getThemeComponentStyleById, getThemeComponentStyles } from "@/lib/api/themeComponentStyles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  themeComponentStyleIdSchema,
  insertThemeComponentStyleParams,
  updateThemeComponentStyleParams,
} from "@/lib/db/schema/themeComponentStyles";
import { createThemeComponentStyle, deleteThemeComponentStyle, updateThemeComponentStyle } from "@/lib/api/themeComponentStyles/mutations";

export const themeComponentStylesRouter = router({
  getThemeComponentStyles: publicProcedure.query(async () => {
    return getThemeComponentStyles();
  }),
  getThemeComponentStyleById: publicProcedure.input(themeComponentStyleIdSchema).query(async ({ input }) => {
    return getThemeComponentStyleById(input.id);
  }),
  createThemeComponentStyle: publicProcedure
    .input(insertThemeComponentStyleParams)
    .mutation(async ({ input }) => {
      return createThemeComponentStyle(input);
    }),
  updateThemeComponentStyle: publicProcedure
    .input(updateThemeComponentStyleParams)
    .mutation(async ({ input }) => {
      return updateThemeComponentStyle(input.id, input);
    }),
  deleteThemeComponentStyle: publicProcedure
    .input(themeComponentStyleIdSchema)
    .mutation(async ({ input }) => {
      return deleteThemeComponentStyle(input.id);
    }),
});
