import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type GlossaryEntryId, glossaryEntryIdSchema, glossaryEntries } from "@/lib/db/schema/glossaryEntries";

export const getGlossaryEntries = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(glossaryEntries).where(eq(glossaryEntries.userId, session?.user.id!));
  const g = rows
  return { glossaryEntries: g };
};

export const getGlossaryEntryById = async (id: GlossaryEntryId) => {
  const { session } = await getUserAuth();
  const { id: glossaryEntryId } = glossaryEntryIdSchema.parse({ id });
  const [row] = await db.select().from(glossaryEntries).where(and(eq(glossaryEntries.id, glossaryEntryId), eq(glossaryEntries.userId, session?.user.id!)));
  if (row === undefined) return {};
  const g = row;
  return { glossaryEntry: g };
};


