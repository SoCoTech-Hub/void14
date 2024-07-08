import { getThemeComponentById, getThemeComponents } from "../api/themeComponents/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  themeComponentIdSchema,
  insertThemeComponentParams,
  updateThemeComponentParams,
} from "@soco/theme-db/schema/themeComponents";
import { createThemeComponent, deleteThemeComponent, updateThemeComponent } from "../api/themeComponents/mutations";

export const themeComponentsRouter =createTRPCRouter({
  getThemeComponents: publicProcedure.query(async () => {
    return getThemeComponents();
  }),
  getThemeComponentById: publicProcedure.input(themeComponentIdSchema).query(async ({ input }) => {
    return getThemeComponentById(input.id);
  }),
  createThemeComponent: publicProcedure
    .input(insertThemeComponentParams)
    .mutation(async ({ input }) => {
      return createThemeComponent(input);
    }),
  updateThemeComponent: publicProcedure
    .input(updateThemeComponentParams)
    .mutation(async ({ input }) => {
      return updateThemeComponent(input.id, input);
    }),
  deleteThemeComponent: publicProcedure
    .input(themeComponentIdSchema)
    .mutation(async ({ input }) => {
      return deleteThemeComponent(input.id);
    }),
});
