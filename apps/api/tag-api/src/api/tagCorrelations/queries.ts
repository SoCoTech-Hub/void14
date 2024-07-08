import { db } from "@soco/tag-db/index";
import { eq } from "drizzle-orm";
import { type TagCorrelationId, tagCorrelationIdSchema, tagCorrelations } from "@soco/tag-db/schema/tagCorrelations";
import { tags } from "@soco/tag-db/schema/tags";

export const getTagCorrelations = async () => {
  const rows = await db.select({ tagCorrelation: tagCorrelations, tag: tags }).from(tagCorrelations).leftJoin(tags, eq(tagCorrelations.tagId, tags.id));
  const t = rows .map((r) => ({ ...r.tagCorrelation, tag: r.tag})); 
  return { tagCorrelations: t };
};

export const getTagCorrelationById = async (id: TagCorrelationId) => {
  const { id: tagCorrelationId } = tagCorrelationIdSchema.parse({ id });
  const [row] = await db.select({ tagCorrelation: tagCorrelations, tag: tags }).from(tagCorrelations).where(eq(tagCorrelations.id, tagCorrelationId)).leftJoin(tags, eq(tagCorrelations.tagId, tags.id));
  if (row === undefined) return {};
  const t =  { ...row.tagCorrelation, tag: row.tag } ;
  return { tagCorrelation: t };
};


