import { eq } from "drizzle-orm";

import type { DataId } from "../db/schema/datas";
import { db } from "../db/index";
import { dataIdSchema, datas } from "../db/schema/datas";

export const getDatas = async () => {
  const rows = await db.select().from(datas);
  const d = rows;
  return { datas: d };
};

export const getDataById = async (id: DataId) => {
  const { id: dataId } = dataIdSchema.parse({ id });
  const [row] = await db.select().from(datas).where(eq(datas.id, dataId));
  if (row === undefined) return {};
  const d = row;
  return { data: d };
};
