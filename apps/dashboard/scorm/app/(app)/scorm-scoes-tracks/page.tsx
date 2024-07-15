import ScormScoesTrackList from "@/components/scormScoesTracks/ScormScoesTrackList";
import NewScormScoesTrackModal from "@/components/scormScoesTracks/ScormScoesTrackModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function ScormScoesTracks() {
  await checkAuth();
  const { scormScoesTracks } = await api.scormScoesTracks.getScormScoesTracks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Scorm Scoes Tracks</h1>
        <NewScormScoesTrackModal />
      </div>
      <ScormScoesTrackList scormScoesTracks={scormScoesTracks} />
    </main>
  );
}
