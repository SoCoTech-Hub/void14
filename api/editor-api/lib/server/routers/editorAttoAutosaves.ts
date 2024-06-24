import { getEditorAttoAutosaveById, getEditorAttoAutosaves } from "@/lib/api/editorAttoAutosaves/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  editorAttoAutosaveIdSchema,
  insertEditorAttoAutosaveParams,
  updateEditorAttoAutosaveParams,
} from "@/lib/db/schema/editorAttoAutosaves";
import { createEditorAttoAutosave, deleteEditorAttoAutosave, updateEditorAttoAutosave } from "@/lib/api/editorAttoAutosaves/mutations";

export const editorAttoAutosavesRouter = router({
  getEditorAttoAutosaves: publicProcedure.query(async () => {
    return getEditorAttoAutosaves();
  }),
  getEditorAttoAutosaveById: publicProcedure.input(editorAttoAutosaveIdSchema).query(async ({ input }) => {
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
