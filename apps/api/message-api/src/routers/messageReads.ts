import {
  insertMessageReadParams,
  messageReadIdSchema,
  updateMessageReadParams,
} from "@soco/message-db/schema/messageReads";

import {
  createMessageRead,
  deleteMessageRead,
  updateMessageRead,
} from "../api/messageReads/mutations";
import {
  getMessageReadById,
  getMessageReads,
} from "../api/messageReads/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageReadsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMessageReads: publicProcedure.query(async () => {
      return getMessageReads();
    }),
    getMessageReadById: publicProcedure
      .input(messageReadIdSchema)
      .query(async ({ input }) => {
        return getMessageReadById(input.id);
      }),
    createMessageRead: publicProcedure
      .input(insertMessageReadParams)
      .mutation(async ({ input }) => {
        return createMessageRead(input);
      }),
    updateMessageRead: publicProcedure
      .input(updateMessageReadParams)
      .mutation(async ({ input }) => {
        return updateMessageRead(input.id, input);
      }),
    deleteMessageRead: publicProcedure
      .input(messageReadIdSchema)
      .mutation(async ({ input }) => {
        return deleteMessageRead(input.id);
      }),
  });
