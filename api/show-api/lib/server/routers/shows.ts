import { getShowById, getShows } from "@/lib/api/shows/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  showIdSchema,
  insertShowParams,
  updateShowParams,
} from "@/lib/db/schema/shows";
import { createShow, deleteShow, updateShow } from "@/lib/api/shows/mutations";

export const showsRouter = router({
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
