import {
  createSupportTopic,
  deleteSupportTopic,
  updateSupportTopic,
} from "../api/supportTopics/mutations";
import {
  getSupportTopicById,
  getSupportTopics,
} from "../api/supportTopics/queries";
import {
  insertSupportTopicParams,
  supportTopicIdSchema,
  updateSupportTopicParams,
} from "../db/schema/supportTopics";
import { publicProcedure, router } from "../server/trpc";

export const supportTopicsRouter = router({
  getSupportTopics: publicProcedure.query(async () => {
    return getSupportTopics();
  }),
  getSupportTopicById: publicProcedure
    .input(supportTopicIdSchema)
    .query(async ({ input }) => {
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
