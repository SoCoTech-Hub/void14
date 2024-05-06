import CohortList from "@/components/cohorts/CohortList";
import NewCohortModal from "@/components/cohorts/CohortModal";
import { api } from "@/lib/trpc/api";

export default async function Cohorts() {
  const { cohorts } = await api.cohorts.getCohorts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Cohorts</h1>
        <NewCohortModal />
      </div>
      <CohortList cohorts={cohorts} />
    </main>
  );
}
