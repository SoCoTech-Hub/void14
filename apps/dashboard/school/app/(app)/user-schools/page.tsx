import UserSchoolList from "@/components/userSchools/UserSchoolList";
import NewUserSchoolModal from "@/components/userSchools/UserSchoolModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function UserSchools() {
  await checkAuth();
  const { userSchools } = await api.userSchools.getUserSchools.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Schools</h1>
        <NewUserSchoolModal />
      </div>
      <UserSchoolList userSchools={userSchools} />
    </main>
  );
}
