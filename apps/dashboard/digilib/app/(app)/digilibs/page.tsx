import DigilibList from "@/components/digilibs/DigilibList";
import NewDigilibModal from "@/components/digilibs/DigilibModal";
import { api } from "@/lib/trpc/api";

export default async function Digilibs() {
  const { digilibs } = await api.digilibs.getDigilibs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Digilibs</h1>
        <NewDigilibModal />
      </div>
      <DigilibList digilibs={digilibs} />
    </main>
  );
}
