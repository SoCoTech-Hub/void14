import MnetServiceEnrolEnrolmentList from "@/components/mnetServiceEnrolEnrolments/MnetServiceEnrolEnrolmentList";
import NewMnetServiceEnrolEnrolmentModal from "@/components/mnetServiceEnrolEnrolments/MnetServiceEnrolEnrolmentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MnetServiceEnrolEnrolments() {
  await checkAuth();
  const { mnetServiceEnrolEnrolments } = await api.mnetServiceEnrolEnrolments.getMnetServiceEnrolEnrolments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Service Enrol Enrolments</h1>
        <NewMnetServiceEnrolEnrolmentModal />
      </div>
      <MnetServiceEnrolEnrolmentList mnetServiceEnrolEnrolments={mnetServiceEnrolEnrolments} />
    </main>
  );
}
