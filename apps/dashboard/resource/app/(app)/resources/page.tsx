import ResourceList from "@/components/resources/ResourceList";
import NewResourceModal from "@/components/resources/ResourceModal";
import { api } from "@/lib/trpc/api";

export default async function Resources() {
  const { resources } = await api.resources.getResources.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Resources</h1>
        <NewResourceModal />
      </div>
      <ResourceList resources={resources} />
    </main>
  );
}
