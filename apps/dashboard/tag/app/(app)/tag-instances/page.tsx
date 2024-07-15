import TagInstanceList from "@/components/tagInstances/TagInstanceList";
import NewTagInstanceModal from "@/components/tagInstances/TagInstanceModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function TagInstances() {
  await checkAuth();
  const { tagInstances } = await api.tagInstances.getTagInstances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tag Instances</h1>
        <NewTagInstanceModal />
      </div>
      <TagInstanceList tagInstances={tagInstances} />
    </main>
  );
}
