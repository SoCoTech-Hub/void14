import { getThemeComponentStyleById, getThemeComponentStyles } from "../api/themeComponentStyles/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  themeComponentStyleIdSchema,
  insertThemeComponentStyleParams,
  updateThemeComponentStyleParams,
} from "@soco/theme-db/schema/themeComponentStyles";
import { createThemeComponentStyle, deleteThemeComponentStyle, updateThemeComponentStyle } from "../api/themeComponentStyles/mutations";

export const themeComponentStylesRouter =createTRPCRouter({
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
