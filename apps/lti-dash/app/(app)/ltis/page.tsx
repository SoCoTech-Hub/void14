import LtiList from "@/components/ltis/LtiList";
import NewLtiModal from "@/components/ltis/LtiModal";
import { api } from "@/lib/trpc/api";

export default async function Ltis() {
  const { ltis } = await api.ltis.getLtis.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Ltis</h1>
        <NewLtiModal />
      </div>
      <LtiList ltis={ltis} />
    </main>
  );
}
