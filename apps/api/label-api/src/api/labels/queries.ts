import { db } from "@soco/label-db/index";
import { eq } from "drizzle-orm";
import { type LabelId, labelIdSchema, labels } from "@soco/label-db/schema/labels";

export const getLabels = async () => {
  const rows = await db.select().from(labels);
  const l = rows
  return { labels: l };
};

export const getLabelById = async (id: LabelId) => {
  const { id: labelId } = labelIdSchema.parse({ id });
  const [row] = await db.select().from(labels).where(eq(labels.id, labelId));
  if (row === undefined) return {};
  const l = row;
  return { label: l };
};


