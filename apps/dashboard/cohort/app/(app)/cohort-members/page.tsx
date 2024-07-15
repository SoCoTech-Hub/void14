import CohortMemberList from "@/components/cohortMembers/CohortMemberList";
import NewCohortMemberModal from "@/components/cohortMembers/CohortMemberModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function CohortMembers() {
  await checkAuth();
  const { cohortMembers } = await api.cohortMembers.getCohortMembers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Cohort Members</h1>
        <NewCohortMemberModal />
      </div>
      <CohortMemberList cohortMembers={cohortMembers} />
    </main>
  );
}
