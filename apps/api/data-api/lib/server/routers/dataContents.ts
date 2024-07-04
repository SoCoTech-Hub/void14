import {
  createDataContent,
  deleteDataContent,
  updateDataContent,
} from "../api/dataContents/mutations";
import {
  getDataContentById,
  getDataContents,
} from "../api/dataContents/queries";
import {
  dataContentIdSchema,
  insertDataContentParams,
  updateDataContentParams,
} from "../db/schema/dataContents";
import { publicProcedure, router } from "../server/trpc";

export const dataContentsRouter = router({
  getDataContents: publicProcedure.query(async () => {
    return getDataContents();
  }),
  getDataContentById: publicProcedure
    .input(dataContentIdSchema)
    .query(async ({ input }) => {
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
