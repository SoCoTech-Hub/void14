import { eq } from "drizzle-orm";

import type { BigBlueButtonBnId } from "../db/schema/bigBlueButtonBns";
import { db } from "../db/index";
import {
  bigBlueButtonBnIdSchema,
  bigBlueButtonBns,
} from "../db/schema/bigBlueButtonBns";

export const getBigBlueButtonBns = async () => {
  const rows = await db.select().from(bigBlueButtonBns);
  const b = rows;
  return { bigBlueButtonBns: b };
};

export const getBigBlueButtonBnById = async (id: BigBlueButtonBnId) => {
  const { id: bigBlueButtonBnId } = bigBlueButtonBnIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(bigBlueButtonBns)
    .where(eq(bigBlueButtonBns.id, bigBlueButtonBnId));
  if (row === undefined) return {};
  const b = row;
  return { bigBlueButtonBn: b };
};
