import {
  createModule,
  deleteModule,
  updateModule,
} from "../api/modules/mutations";
import { getModuleById, getModules } from "../api/modules/queries";
import {
  insertModuleParams,
  moduleIdSchema,
  updateModuleParams,
} from "../db/schema/modules";
import { publicProcedure, router } from "../server/trpc";

export const modulesRouter = router({
  getModules: publicProcedure.query(async () => {
    return getModules();
  }),
  getModuleById: publicProcedure
    .input(moduleIdSchema)
    .query(async ({ input }) => {
      return getModuleById(input.id);
    }),
  createModule: publicProcedure
    .input(insertModuleParams)
    .mutation(async ({ input }) => {
      return createModule(input);
    }),
  updateModule: publicProcedure
    .input(updateModuleParams)
    .mutation(async ({ input }) => {
      return updateModule(input.id, input);
    }),
  deleteModule: publicProcedure
    .input(moduleIdSchema)
    .mutation(async ({ input }) => {
      return deleteModule(input.id);
    }),
});
