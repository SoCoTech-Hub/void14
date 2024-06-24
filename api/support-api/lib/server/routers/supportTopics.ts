import { getSupportTopicById, getSupportTopics } from "@/lib/api/supportTopics/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  supportTopicIdSchema,
  insertSupportTopicParams,
  updateSupportTopicParams,
} from "@/lib/db/schema/supportTopics";
import { createSupportTopic, deleteSupportTopic, updateSupportTopic } from "@/lib/api/supportTopics/mutations";

export const supportTopicsRouter = router({
  getSupportTopics: publicProcedure.query(async () => {
    return getSupportTopics();
  }),
  getSupportTopicById: publicProcedure.input(supportTopicIdSchema).query(async ({ input }) => {
    return getSupportTopicById(input.id);
  }),
  createSupportTopic: publicProcedure
    .input(insertSupportTopicParams)
    .mutation(async ({ input }) => {
      return createSupportTopic(input);
    }),
  updateSupportTopic: publicProcedure
    .input(updateSupportTopicParams)
    .mutation(async ({ input }) => {
      return updateSupportTopic(input.id, input);
    }),
  deleteSupportTopic: publicProcedure
    .input(supportTopicIdSchema)
    .mutation(async ({ input }) => {
      return deleteSupportTopic(input.id);
    }),
});
