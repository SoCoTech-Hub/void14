import { eq } from "drizzle-orm";

import type { CustomFieldDataId } from "../db/schema/customFieldDatas";
import { db } from "../db/index";
import {
  customFieldDataIdSchema,
  customFieldDatas,
} from "../db/schema/customFieldDatas";

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
