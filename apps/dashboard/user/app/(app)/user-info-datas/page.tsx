import UserInfoDataList from "@/components/userInfoDatas/UserInfoDataList";
import NewUserInfoDataModal from "@/components/userInfoDatas/UserInfoDataModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserInfoDatas() {
  await checkAuth();
  const { userInfoDatas } = await api.userInfoDatas.getUserInfoDatas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Info Datas</h1>
        <NewUserInfoDataModal />
      </div>
      <UserInfoDataList userInfoDatas={userInfoDatas} />
    </main>
  );
}
