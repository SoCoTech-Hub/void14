import { getBlockInstanceById, getBlockInstances } from "../api/blockInstances/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  blockInstanceIdSchema,
  insertBlockInstanceParams,
  updateBlockInstanceParams,
} from "@soco/block-db/schema/blockInstances";
import { createBlockInstance, deleteBlockInstance, updateBlockInstance } from "../api/blockInstances/mutations";

export const blockInstancesRouter =createTRPCRouter({
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
