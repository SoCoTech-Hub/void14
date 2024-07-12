import type { ExternalServiceId } from "@soco/external-db/schema/externalServices";
import { eq } from "@soco/external-db";
import { db } from "@soco/external-db/client";
import {
  externalServiceIdSchema,
  externalServices,
} from "@soco/external-db/schema/externalServices";

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
