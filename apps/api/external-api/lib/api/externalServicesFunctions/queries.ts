import { eq } from "drizzle-orm";

import type { ExternalServicesFunctionId } from "../../db/schema/externalServicesFunctions";
import { db } from "../../db/index";
import {
  externalServicesFunctionIdSchema,
  externalServicesFunctions,
} from "../../db/schema/externalServicesFunctions";

export const getExternalServicesFunctions = async () => {
  const rows = await db.select().from(externalServicesFunctions);
  const e = rows;
  return { externalServicesFunctions: e };
};

export const getExternalServicesFunctionById = async (
  id: ExternalServicesFunctionId,
) => {
  const { id: externalServicesFunctionId } =
    externalServicesFunctionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(externalServicesFunctions)
    .where(eq(externalServicesFunctions.id, externalServicesFunctionId));
  if (row === undefined) return {};
  const e = row;
  return { externalServicesFunction: e };
};
