import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ExternalFunctionId, externalFunctionIdSchema, externalFunctions } from "@/lib/db/schema/externalFunctions";

export const getExternalFunctions = async () => {
  const rows = await db.select().from(externalFunctions);
  const e = rows
  return { externalFunctions: e };
};

export const getExternalFunctionById = async (id: ExternalFunctionId) => {
  const { id: externalFunctionId } = externalFunctionIdSchema.parse({ id });
  const [row] = await db.select().from(externalFunctions).where(eq(externalFunctions.id, externalFunctionId));
  if (row === undefined) return {};
  const e = row;
  return { externalFunction: e };
};


