import { getDataContentById, getDataContents } from "@/lib/api/dataContents/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  dataContentIdSchema,
  insertDataContentParams,
  updateDataContentParams,
} from "@/lib/db/schema/dataContents";
import { createDataContent, deleteDataContent, updateDataContent } from "@/lib/api/dataContents/mutations";

export const dataContentsRouter = router({
  getDataContents: publicProcedure.query(async () => {
    return getDataContents();
  }),
  getDataContentById: publicProcedure.input(dataContentIdSchema).query(async ({ input }) => {
    return getDataContentById(input.id);
  }),
  createDataContent: publicProcedure
    .input(insertDataContentParams)
    .mutation(async ({ input }) => {
      return createDataContent(input);
    }),
  updateDataContent: publicProcedure
    .input(updateDataContentParams)
    .mutation(async ({ input }) => {
      return updateDataContent(input.id, input);
    }),
  deleteDataContent: publicProcedure
    .input(dataContentIdSchema)
    .mutation(async ({ input }) => {
      return deleteDataContent(input.id);
    }),
});
