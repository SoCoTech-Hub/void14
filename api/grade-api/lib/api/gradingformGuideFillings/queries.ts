import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradingformGuideFillingId, gradingformGuideFillingIdSchema, gradingformGuideFillings } from "@/lib/db/schema/gradingformGuideFillings";

export const getGradingformGuideFillings = async () => {
  const rows = await db.select().from(gradingformGuideFillings);
  const g = rows
  return { gradingformGuideFillings: g };
};

export const getGradingformGuideFillingById = async (id: GradingformGuideFillingId) => {
  const { id: gradingformGuideFillingId } = gradingformGuideFillingIdSchema.parse({ id });
  const [row] = await db.select().from(gradingformGuideFillings).where(eq(gradingformGuideFillings.id, gradingformGuideFillingId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformGuideFilling: g };
};


