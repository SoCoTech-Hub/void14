import { eq } from "drizzle-orm";

import type { BursaryCategoriesBursaryId } from "../db/schema/bursaryCategoriesBursaries";
import { db } from "../db/index";
import { bursaries } from "../db/schema/bursaries";
import { bursaryCategories } from "../db/schema/bursaryCategories";
import {
  bursaryCategoriesBursaries,
  bursaryCategoriesBursaryIdSchema,
} from "../db/schema/bursaryCategoriesBursaries";

export const getBursaryCategoriesBursaries = async () => {
  const rows = await db
    .select({
      bursaryCategoriesBursary: bursaryCategoriesBursaries,
      bursary: bursaries,
      bursaryCategory: bursaryCategories,
    })
    .from(bursaryCategoriesBursaries)
    .leftJoin(bursaries, eq(bursaryCategoriesBursaries.bursaryId, bursaries.id))
    .leftJoin(
      bursaryCategories,
      eq(bursaryCategoriesBursaries.bursaryCategoryId, bursaryCategories.id),
    );
  const b = rows.map((r) => ({
    ...r.bursaryCategoriesBursary,
    bursary: r.bursary,
    bursaryCategory: r.bursaryCategory,
  }));
  return { bursaryCategoriesBursaries: b };
};

export const getBursaryCategoriesBursaryById = async (
  id: BursaryCategoriesBursaryId,
) => {
  const { id: bursaryCategoriesBursaryId } =
    bursaryCategoriesBursaryIdSchema.parse({ id });
  const [row] = await db
    .select({
      bursaryCategoriesBursary: bursaryCategoriesBursaries,
      bursary: bursaries,
      bursaryCategory: bursaryCategories,
    })
    .from(bursaryCategoriesBursaries)
    .where(eq(bursaryCategoriesBursaries.id, bursaryCategoriesBursaryId))
    .leftJoin(bursaries, eq(bursaryCategoriesBursaries.bursaryId, bursaries.id))
    .leftJoin(
      bursaryCategories,
      eq(bursaryCategoriesBursaries.bursaryCategoryId, bursaryCategories.id),
    );
  if (row === undefined) return {};
  const b = {
    ...row.bursaryCategoriesBursary,
    bursary: row.bursary,
    bursaryCategory: row.bursaryCategory,
  };
  return { bursaryCategoriesBursary: b };
};
