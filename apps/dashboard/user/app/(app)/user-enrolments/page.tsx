import UserEnrolmentList from "@/components/userEnrolments/UserEnrolmentList";
import NewUserEnrolmentModal from "@/components/userEnrolments/UserEnrolmentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function UserEnrolments() {
  await checkAuth();
  const { userEnrolments } = await api.userEnrolments.getUserEnrolments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">User Enrolments</h1>
        <NewUserEnrolmentModal />
      </div>
      <UserEnrolmentList userEnrolments={userEnrolments} />
    </main>
  );
}
