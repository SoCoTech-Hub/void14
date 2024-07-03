import { getToolCustomLangById, getToolCustomLangs } from "@/lib/api/toolCustomLangs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolCustomLangIdSchema,
  insertToolCustomLangParams,
  updateToolCustomLangParams,
} from "@/lib/db/schema/toolCustomLangs";
import { createToolCustomLang, deleteToolCustomLang, updateToolCustomLang } from "@/lib/api/toolCustomLangs/mutations";

export const toolCustomLangsRouter = router({
  getToolCustomLangs: publicProcedure.query(async () => {
    return getToolCustomLangs();
  }),
  getToolCustomLangById: publicProcedure.input(toolCustomLangIdSchema).query(async ({ input }) => {
    return getToolCustomLangById(input.id);
  }),
  createToolCustomLang: publicProcedure
    .input(insertToolCustomLangParams)
    .mutation(async ({ input }) => {
      return createToolCustomLang(input);
    }),
  updateToolCustomLang: publicProcedure
    .input(updateToolCustomLangParams)
    .mutation(async ({ input }) => {
      return updateToolCustomLang(input.id, input);
    }),
  deleteToolCustomLang: publicProcedure
    .input(toolCustomLangIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolCustomLang(input.id);
    }),
});
