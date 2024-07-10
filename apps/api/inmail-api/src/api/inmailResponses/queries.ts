import { db } from "@soco/inmail-db/client";
import { eq, and } from "@soco/inmail-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type InmailResponseId, inmailResponseIdSchema, inmailResponses } from "@soco/inmail-db/schema/inmailResponses";
import { inmails } from "@soco/inmail-db/schema/inmails";

export const getInmailResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ inmailResponse: inmailResponses, inmail: inmails }).from(inmailResponses).leftJoin(inmails, eq(inmailResponses.inmailId, inmails.id)).where(eq(inmailResponses.userId, session?.user.id!));
  const i = rows .map((r) => ({ ...r.inmailResponse, inmail: r.inmail})); 
  return { inmailResponses: i };
};

export const getInmailResponseById = async (id: InmailResponseId) => {
  const { session } = await getUserAuth();
  const { id: inmailResponseId } = inmailResponseIdSchema.parse({ id });
  const [row] = await db.select({ inmailResponse: inmailResponses, inmail: inmails }).from(inmailResponses).where(and(eq(inmailResponses.id, inmailResponseId), eq(inmailResponses.userId, session?.user.id!))).leftJoin(inmails, eq(inmailResponses.inmailId, inmails.id));
  if (row === undefined) return {};
  const i =  { ...row.inmailResponse, inmail: row.inmail } ;
  return { inmailResponse: i };
};


