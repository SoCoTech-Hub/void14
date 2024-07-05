import { eq } from "drizzle-orm";

import type { CustomFieldFieldId } from "../../db/schema/customFieldFields";
import { db } from "../../db/index";
import { customFieldCategories } from "../../db/schema/customFieldCategories";
import {
  customFieldFieldIdSchema,
  customFieldFields,
} from "../../db/schema/customFieldFields";

export const getCustomFieldFields = async () => {
  const rows = await db
    .select({
      customFieldField: customFieldFields,
      customFieldCategory: customFieldCategories,
    })
    .from(customFieldFields)
    .leftJoin(
      customFieldCategories,
      eq(customFieldFields.customFieldCategoryId, customFieldCategories.id),
    );
  const c = rows.map((r) => ({
    ...r.customFieldField,
    customFieldCategory: r.customFieldCategory,
  }));
  return { customFieldFields: c };
};

export const getCustomFieldFieldById = async (id: CustomFieldFieldId) => {
  const { id: customFieldFieldId } = customFieldFieldIdSchema.parse({ id });
  const [row] = await db
    .select({
      customFieldField: customFieldFields,
      customFieldCategory: customFieldCategories,
    })
    .from(customFieldFields)
    .where(eq(customFieldFields.id, customFieldFieldId))
    .leftJoin(
      customFieldCategories,
      eq(customFieldFields.customFieldCategoryId, customFieldCategories.id),
    );
  if (row === undefined) return {};
  const c = {
    ...row.customFieldField,
    customFieldCategory: row.customFieldCategory,
  };
  return { customFieldField: c };
};
