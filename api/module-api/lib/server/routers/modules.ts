import { getModuleById, getModules } from "@/lib/api/modules/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  moduleIdSchema,
  insertModuleParams,
  updateModuleParams,
} from "@/lib/db/schema/modules";
import { createModule, deleteModule, updateModule } from "@/lib/api/modules/mutations";

export const modulesRouter = router({
  getModules: publicProcedure.query(async () => {
    return getModules();
  }),
  getModuleById: publicProcedure.input(moduleIdSchema).query(async ({ input }) => {
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
