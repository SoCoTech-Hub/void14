import MassMailListList from "@/components/massMailLists/MassMailListList";
import NewMassMailListModal from "@/components/massMailLists/MassMailListModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MassMailLists() {
  await checkAuth();
  const { massMailLists } = await api.massMailLists.getMassMailLists.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mass Mail Lists</h1>
        <NewMassMailListModal />
      </div>
      <MassMailListList massMailLists={massMailLists} />
    </main>
  );
}
