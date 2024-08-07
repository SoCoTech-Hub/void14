import type { UserInfoDataId } from "@soco/user-db/schema/userInfoDatas";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/user-db";
import { db } from "@soco/user-db/client";
import {
  userInfoDataIdSchema,
  userInfoDatas,
} from "@soco/user-db/schema/userInfoDatas";

export const getUserInfoDatas = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userInfoDatas)
    .where(eq(userInfoDatas.userId, session?.user.id!));
  const u = rows;
  return { userInfoDatas: u };
};

export const getUserInfoDataById = async (id: UserInfoDataId) => {
  const { session } = await getUserAuth();
  const { id: userInfoDataId } = userInfoDataIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userInfoDatas)
    .where(
      and(
        eq(userInfoDatas.id, userInfoDataId),
        eq(userInfoDatas.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userInfoData: u };
};
