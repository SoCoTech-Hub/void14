import {
  insertToolCustomLangParams,
  toolCustomLangIdSchema,
  updateToolCustomLangParams,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangs";

import {
  createToolCustomLang,
  deleteToolCustomLang,
  updateToolCustomLang,
} from "../api/toolCustomLangs/mutations";
import {
  getToolCustomLangById,
  getToolCustomLangs,
} from "../api/toolCustomLangs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolCustomLangsRouter = createTRPCRouter({
  getToolCustomLangs: publicProcedure.query(async () => {
    return getToolCustomLangs();
  }),
  getToolCustomLangById: publicProcedure
    .input(toolCustomLangIdSchema)
    .query(async ({ input }) => {
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
