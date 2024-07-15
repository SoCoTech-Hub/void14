import WorkshopAggregationList from "@/components/workshopAggregations/WorkshopAggregationList";
import NewWorkshopAggregationModal from "@/components/workshopAggregations/WorkshopAggregationModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function WorkshopAggregations() {
  await checkAuth();
  const { workshopAggregations } = await api.workshopAggregations.getWorkshopAggregations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Workshop Aggregations</h1>
        <NewWorkshopAggregationModal />
      </div>
      <WorkshopAggregationList workshopAggregations={workshopAggregations} />
    </main>
  );
}
