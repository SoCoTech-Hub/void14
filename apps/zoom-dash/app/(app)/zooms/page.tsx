import ZoomList from "@/components/zooms/ZoomList";
import NewZoomModal from "@/components/zooms/ZoomModal";
import { api } from "@/lib/trpc/api";

export default async function Zooms() {
  const { zooms } = await api.zooms.getZooms.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Zooms</h1>
        <NewZoomModal />
      </div>
      <ZoomList zooms={zooms} />
    </main>
  );
}
