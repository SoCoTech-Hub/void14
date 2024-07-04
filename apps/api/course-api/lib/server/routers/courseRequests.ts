import {
  createCourseRequest,
  deleteCourseRequest,
  updateCourseRequest,
} from "../api/courseRequests/mutations";
import {
  getCourseRequestById,
  getCourseRequests,
} from "../api/courseRequests/queries";
import {
  courseRequestIdSchema,
  insertCourseRequestParams,
  updateCourseRequestParams,
} from "../db/schema/courseRequests";
import { publicProcedure, router } from "../server/trpc";

export const courseRequestsRouter = router({
  getCourseRequests: publicProcedure.query(async () => {
    return getCourseRequests();
  }),
  getCourseRequestById: publicProcedure
    .input(courseRequestIdSchema)
    .query(async ({ input }) => {
      return getCourseRequestById(input.id);
    }),
  createCourseRequest: publicProcedure
    .input(insertCourseRequestParams)
    .mutation(async ({ input }) => {
      return createCourseRequest(input);
    }),
  updateCourseRequest: publicProcedure
    .input(updateCourseRequestParams)
    .mutation(async ({ input }) => {
      return updateCourseRequest(input.id, input);
    }),
  deleteCourseRequest: publicProcedure
    .input(courseRequestIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseRequest(input.id);
    }),
});
