import { getThemeComponentById, getThemeComponents } from "@/lib/api/themeComponents/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  themeComponentIdSchema,
  insertThemeComponentParams,
  updateThemeComponentParams,
} from "@/lib/db/schema/themeComponents";
import { createThemeComponent, deleteThemeComponent, updateThemeComponent } from "@/lib/api/themeComponents/mutations";

export const themeComponentsRouter = router({
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
