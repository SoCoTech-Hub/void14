import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { InmailResponseId } from "../db/schema/inmailResponses";
import { db } from "../db/index";
import {
  inmailResponseIdSchema,
  inmailResponses,
} from "../db/schema/inmailResponses";
import { inmails } from "../db/schema/inmails";

export const getInmailResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ inmailResponse: inmailResponses, inmail: inmails })
    .from(inmailResponses)
    .leftJoin(inmails, eq(inmailResponses.inmailId, inmails.id))
    .where(eq(inmailResponses.userId, session?.user.id!));
  const i = rows.map((r) => ({ ...r.inmailResponse, inmail: r.inmail }));
  return { inmailResponses: i };
};

export const getInmailResponseById = async (id: InmailResponseId) => {
  const { session } = await getUserAuth();
  const { id: inmailResponseId } = inmailResponseIdSchema.parse({ id });
  const [row] = await db
    .select({ inmailResponse: inmailResponses, inmail: inmails })
    .from(inmailResponses)
    .where(
      and(
        eq(inmailResponses.id, inmailResponseId),
        eq(inmailResponses.userId, session?.user.id!),
      ),
    )
    .leftJoin(inmails, eq(inmailResponses.inmailId, inmails.id));
  if (row === undefined) return {};
  const i = { ...row.inmailResponse, inmail: row.inmail };
  return { inmailResponse: i };
};
