import ImscpList from "@/components/imscps/ImscpList";
import NewImscpModal from "@/components/imscps/ImscpModal";
import { api } from "@/lib/trpc/api";

export default async function Imscps() {
  const { imscps } = await api.imscps.getImscps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Imscps</h1>
        <NewImscpModal />
      </div>
      <ImscpList imscps={imscps} />
    </main>
  );
}
