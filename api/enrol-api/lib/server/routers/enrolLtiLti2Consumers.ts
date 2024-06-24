import { getEnrolLtiLti2ConsumerById, getEnrolLtiLti2Consumers } from "@/lib/api/enrolLtiLti2Consumers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  enrolLtiLti2ConsumerIdSchema,
  insertEnrolLtiLti2ConsumerParams,
  updateEnrolLtiLti2ConsumerParams,
} from "@/lib/db/schema/enrolLtiLti2Consumers";
import { createEnrolLtiLti2Consumer, deleteEnrolLtiLti2Consumer, updateEnrolLtiLti2Consumer } from "@/lib/api/enrolLtiLti2Consumers/mutations";

export const enrolLtiLti2ConsumersRouter = router({
  getEnrolLtiLti2Consumers: publicProcedure.query(async () => {
    return getEnrolLtiLti2Consumers();
  }),
  getEnrolLtiLti2ConsumerById: publicProcedure.input(enrolLtiLti2ConsumerIdSchema).query(async ({ input }) => {
    return getEnrolLtiLti2ConsumerById(input.id);
  }),
  createEnrolLtiLti2Consumer: publicProcedure
    .input(insertEnrolLtiLti2ConsumerParams)
    .mutation(async ({ input }) => {
      return createEnrolLtiLti2Consumer(input);
    }),
  updateEnrolLtiLti2Consumer: publicProcedure
    .input(updateEnrolLtiLti2ConsumerParams)
    .mutation(async ({ input }) => {
      return updateEnrolLtiLti2Consumer(input.id, input);
    }),
  deleteEnrolLtiLti2Consumer: publicProcedure
    .input(enrolLtiLti2ConsumerIdSchema)
    .mutation(async ({ input }) => {
      return deleteEnrolLtiLti2Consumer(input.id);
    }),
});
