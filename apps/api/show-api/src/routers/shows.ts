import { getShowById, getShows } from "../api/shows/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  showIdSchema,
  insertShowParams,
  updateShowParams,
} from "@soco/show-db/schema/shows";
import { createShow, deleteShow, updateShow } from "../api/shows/mutations";

export const showsRouter =createTRPCRouter({
  getShows: publicProcedure.query(async () => {
    return getShows();
  }),
  getShowById: publicProcedure.input(showIdSchema).query(async ({ input }) => {
    return getShowById(input.id);
  }),
  createShow: publicProcedure
    .input(insertShowParams)
    .mutation(async ({ input }) => {
      return createShow(input);
    }),
  updateShow: publicProcedure
    .input(updateShowParams)
    .mutation(async ({ input }) => {
      return updateShow(input.id, input);
    }),
  deleteShow: publicProcedure
    .input(showIdSchema)
    .mutation(async ({ input }) => {
      return deleteShow(input.id);
    }),
});
