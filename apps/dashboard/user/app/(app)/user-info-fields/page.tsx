import UserInfoFieldList from "@/components/userInfoFields/UserInfoFieldList";
import NewUserInfoFieldModal from "@/components/userInfoFields/UserInfoFieldModal";
import { api } from "@/lib/trpc/api";

export default async function UserInfoFields() {
  const { userInfoFields } = await api.userInfoFields.getUserInfoFields.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Info Fields</h1>
        <NewUserInfoFieldModal />
      </div>
      <UserInfoFieldList userInfoFields={userInfoFields} />
    </main>
  );
}
