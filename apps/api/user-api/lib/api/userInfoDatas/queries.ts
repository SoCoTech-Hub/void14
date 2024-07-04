import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type UserInfoDataId, userInfoDataIdSchema, userInfoDatas } from "@/lib/db/schema/userInfoDatas";

export const getUserInfoDatas = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(userInfoDatas).where(eq(userInfoDatas.userId, session?.user.id!));
  const u = rows
  return { userInfoDatas: u };
};

export const getUserInfoDataById = async (id: UserInfoDataId) => {
  const { session } = await getUserAuth();
  const { id: userInfoDataId } = userInfoDataIdSchema.parse({ id });
  const [row] = await db.select().from(userInfoDatas).where(and(eq(userInfoDatas.id, userInfoDataId), eq(userInfoDatas.userId, session?.user.id!)));
  if (row === undefined) return {};
  const u = row;
  return { userInfoData: u };
};


