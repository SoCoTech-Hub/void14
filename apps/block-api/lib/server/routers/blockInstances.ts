import { getBlockInstanceById, getBlockInstances } from "@/lib/api/blockInstances/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blockInstanceIdSchema,
  insertBlockInstanceParams,
  updateBlockInstanceParams,
} from "@/lib/db/schema/blockInstances";
import { createBlockInstance, deleteBlockInstance, updateBlockInstance } from "@/lib/api/blockInstances/mutations";

export const blockInstancesRouter = router({
  getBlockInstances: publicProcedure.query(async () => {
    return getBlockInstances();
  }),
  getBlockInstanceById: publicProcedure.input(blockInstanceIdSchema).query(async ({ input }) => {
    return getBlockInstanceById(input.id);
  }),
  createBlockInstance: publicProcedure
    .input(insertBlockInstanceParams)
    .mutation(async ({ input }) => {
      return createBlockInstance(input);
    }),
  updateBlockInstance: publicProcedure
    .input(updateBlockInstanceParams)
    .mutation(async ({ input }) => {
      return updateBlockInstance(input.id, input);
    }),
  deleteBlockInstance: publicProcedure
    .input(blockInstanceIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlockInstance(input.id);
    }),
});
