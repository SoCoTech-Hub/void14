import { eq } from "drizzle-orm";

import type { H5pactivityAttemptsResultId } from "../db/schema/h5pactivityAttemptsResults";
import { db } from "../db/index";
import {
  h5pactivityAttemptsResultIdSchema,
  h5pactivityAttemptsResults,
} from "../db/schema/h5pactivityAttemptsResults";

export const getH5pactivityAttemptsResults = async () => {
  const rows = await db.select().from(h5pactivityAttemptsResults);
  const h = rows;
  return { h5pactivityAttemptsResults: h };
};

export const getH5pactivityAttemptsResultById = async (
  id: H5pactivityAttemptsResultId,
) => {
  const { id: h5pactivityAttemptsResultId } =
    h5pactivityAttemptsResultIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(h5pactivityAttemptsResults)
    .where(eq(h5pactivityAttemptsResults.id, h5pactivityAttemptsResultId));
  if (row === undefined) return {};
  const h = row;
  return { h5pactivityAttemptsResult: h };
};
