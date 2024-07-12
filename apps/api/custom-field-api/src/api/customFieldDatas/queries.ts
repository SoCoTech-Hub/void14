import type { CustomFieldDataId } from "@soco/custom-field-db/schema/customFieldDatas";
import { eq } from "@soco/custom-field-db";
import { db } from "@soco/custom-field-db/client";
import {
  customFieldDataIdSchema,
  customFieldDatas,
} from "@soco/custom-field-db/schema/customFieldDatas";

export const getCustomFieldDatas = async () => {
  const rows = await db.select().from(customFieldDatas);
  const c = rows;
  return { customFieldDatas: c };
};

export const getCustomFieldDataById = async (id: CustomFieldDataId) => {
  const { id: customFieldDataId } = customFieldDataIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(customFieldDatas)
    .where(eq(customFieldDatas.id, customFieldDataId));
  if (row === undefined) return {};
  const c = row;
  return { customFieldData: c };
};
