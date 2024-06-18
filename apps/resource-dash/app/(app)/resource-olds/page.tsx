import ResourceOldList from "@/components/resourceOlds/ResourceOldList";
import NewResourceOldModal from "@/components/resourceOlds/ResourceOldModal";
import { api } from "@/lib/trpc/api";

export default async function ResourceOlds() {
  const { resourceOlds } = await api.resourceOlds.getResourceOlds.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Resource Olds</h1>
        <NewResourceOldModal />
      </div>
      <ResourceOldList resourceOlds={resourceOlds} />
    </main>
  );
}
