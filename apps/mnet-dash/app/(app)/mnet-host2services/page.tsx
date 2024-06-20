import MnetHost2serviceList from "@/components/mnetHost2services/MnetHost2serviceList";
import NewMnetHost2serviceModal from "@/components/mnetHost2services/MnetHost2serviceModal";
import { api } from "@/lib/trpc/api";

export default async function MnetHost2services() {
  const { mnetHost2services } = await api.mnetHost2services.getMnetHost2services.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Host2services</h1>
        <NewMnetHost2serviceModal />
      </div>
      <MnetHost2serviceList mnetHost2services={mnetHost2services} />
    </main>
  );
}
