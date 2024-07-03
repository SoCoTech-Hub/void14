import MediaList from "@/components/medias/MediaList";
import NewMediaModal from "@/components/medias/MediaModal";
import { api } from "@/lib/trpc/api";

export default async function Medias() {
  const { medias } = await api.medias.getMedias.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Medias</h1>
        <NewMediaModal />
      </div>
      <MediaList medias={medias} />
    </main>
  );
}
