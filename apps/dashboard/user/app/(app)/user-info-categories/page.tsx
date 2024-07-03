import UserInfoCategoryList from "@/components/userInfoCategories/UserInfoCategoryList";
import NewUserInfoCategoryModal from "@/components/userInfoCategories/UserInfoCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function UserInfoCategories() {
  const { userInfoCategories } = await api.userInfoCategories.getUserInfoCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Info Categories</h1>
        <NewUserInfoCategoryModal />
      </div>
      <UserInfoCategoryList userInfoCategories={userInfoCategories} />
    </main>
  );
}
