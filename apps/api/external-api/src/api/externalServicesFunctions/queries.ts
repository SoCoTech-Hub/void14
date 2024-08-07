import type { ExternalServicesFunctionId } from "@soco/external-db/schema/externalServicesFunctions";
import { eq } from "@soco/external-db";
import { db } from "@soco/external-db/client";
import {
  externalServicesFunctionIdSchema,
  externalServicesFunctions,
} from "@soco/external-db/schema/externalServicesFunctions";

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
