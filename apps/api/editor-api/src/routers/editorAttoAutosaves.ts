import {
  editorAttoAutosaveIdSchema,
  insertEditorAttoAutosaveParams,
  updateEditorAttoAutosaveParams,
} from "@soco/editor-db/schema/editorAttoAutosaves";

import {
  createEditorAttoAutosave,
  deleteEditorAttoAutosave,
  updateEditorAttoAutosave,
} from "../api/editorAttoAutosaves/mutations";
import {
  getEditorAttoAutosaveById,
  getEditorAttoAutosaves,
} from "../api/editorAttoAutosaves/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const editorAttoAutosavesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getEditorAttoAutosaves: publicProcedure.query(async () => {
      return getEditorAttoAutosaves();
    }),
    getEditorAttoAutosaveById: publicProcedure
      .input(editorAttoAutosaveIdSchema)
      .query(async ({ input }) => {
        return getEditorAttoAutosaveById(input.id);
      }),
    createEditorAttoAutosave: publicProcedure
      .input(insertEditorAttoAutosaveParams)
      .mutation(async ({ input }) => {
        return createEditorAttoAutosave(input);
      }),
    updateEditorAttoAutosave: publicProcedure
      .input(updateEditorAttoAutosaveParams)
      .mutation(async ({ input }) => {
        return updateEditorAttoAutosave(input.id, input);
      }),
    deleteEditorAttoAutosave: publicProcedure
      .input(editorAttoAutosaveIdSchema)
      .mutation(async ({ input }) => {
        return deleteEditorAttoAutosave(input.id);
      }),
  });
