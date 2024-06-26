import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CourseRequestId, courseRequestIdSchema, courseRequests } from "@/lib/db/schema/courseRequests";

export const getCourseRequests = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(courseRequests).where(eq(courseRequests.userId, session?.user.id!));
  const c = rows
  return { courseRequests: c };
};

export const getCourseRequestById = async (id: CourseRequestId) => {
  const { session } = await getUserAuth();
  const { id: courseRequestId } = courseRequestIdSchema.parse({ id });
  const [row] = await db.select().from(courseRequests).where(and(eq(courseRequests.id, courseRequestId), eq(courseRequests.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { courseRequest: c };
};


