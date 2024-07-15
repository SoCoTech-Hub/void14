import EnrolLtiUserList from "@/components/enrolLtiUsers/EnrolLtiUserList";
import NewEnrolLtiUserModal from "@/components/enrolLtiUsers/EnrolLtiUserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function EnrolLtiUsers() {
  await checkAuth();
  const { enrolLtiUsers } = await api.enrolLtiUsers.getEnrolLtiUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Users</h1>
        <NewEnrolLtiUserModal />
      </div>
      <EnrolLtiUserList enrolLtiUsers={enrolLtiUsers} />
    </main>
  );
}
