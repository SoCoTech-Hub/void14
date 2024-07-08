import { db } from "@soco/enrol-db/index";
import { eq } from "drizzle-orm";
import { type EnrolId, enrolIdSchema, enrols } from "@soco/enrol-db/schema/enrols";

export const getEnrols = async () => {
  const rows = await db.select().from(enrols);
  const e = rows
  return { enrols: e };
};

export const getEnrolById = async (id: EnrolId) => {
  const { id: enrolId } = enrolIdSchema.parse({ id });
  const [row] = await db.select().from(enrols).where(eq(enrols.id, enrolId));
  if (row === undefined) return {};
  const e = row;
  return { enrol: e };
};


