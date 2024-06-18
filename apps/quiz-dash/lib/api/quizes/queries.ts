import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuizeId, quizeIdSchema, quizes } from "@/lib/db/schema/quizes";

export const getQuizes = async () => {
  const rows = await db.select().from(quizes);
  const q = rows
  return { quizes: q };
};

export const getQuizeById = async (id: QuizeId) => {
  const { id: quizeId } = quizeIdSchema.parse({ id });
  const [row] = await db.select().from(quizes).where(eq(quizes.id, quizeId));
  if (row === undefined) return {};
  const q = row;
  return { quize: q };
};


