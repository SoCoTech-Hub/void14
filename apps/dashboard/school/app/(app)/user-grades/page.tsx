import UserGradeList from "@/components/userGrades/UserGradeList";
import NewUserGradeModal from "@/components/userGrades/UserGradeModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function UserGrades() {
  await checkAuth();
  const { userGrades } = await api.userGrades.getUserGrades.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Grades</h1>
        <NewUserGradeModal />
      </div>
      <UserGradeList userGrades={userGrades} />
    </main>
  );
}
