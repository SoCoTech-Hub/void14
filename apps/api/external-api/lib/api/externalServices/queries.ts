import { eq } from "drizzle-orm";

import type { ExternalServiceId } from "../../db/schema/externalServices";
import { db } from "../../db/index";
import {
  externalServiceIdSchema,
  externalServices,
} from "../../db/schema/externalServices";

export const getExternalServices = async () => {
  const rows = await db.select().from(externalServices);
  const e = rows;
  return { externalServices: e };
};

export const getExternalServiceById = async (id: ExternalServiceId) => {
  const { id: externalServiceId } = externalServiceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(externalServices)
    .where(eq(externalServices.id, externalServiceId));
  if (row === undefined) return {};
  const e = row;
  return { externalService: e };
};
