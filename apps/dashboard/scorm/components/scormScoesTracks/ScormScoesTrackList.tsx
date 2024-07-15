"use client";
import { CompleteScormScoesTrack } from "@soco/scorm-db/schema/scormScoesTracks";
import { trpc } from "@/lib/trpc/client";
import ScormScoesTrackModal from "./ScormScoesTrackModal";


export default function ScormScoesTrackList({ scormScoesTracks }: { scormScoesTracks: CompleteScormScoesTrack[] }) {
  const { data: s } = trpc.scormScoesTracks.getScormScoesTracks.useQuery(undefined, {
    initialData: { scormScoesTracks },
    refetchOnMount: false,
  });

  if (s.scormScoesTracks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormScoesTracks.map((scormScoesTrack) => (
        <ScormScoesTrack scormScoesTrack={scormScoesTrack} key={scormScoesTrack.scormScoesTrack.id} />
      ))}
    </ul>
  );
}

const ScormScoesTrack = ({ scormScoesTrack }: { scormScoesTrack: CompleteScormScoesTrack }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormScoesTrack.scormScoesTrack.element}</div>
      </div>
      <ScormScoesTrackModal scormScoesTrack={scormScoesTrack.scormScoesTrack} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm scoes tracks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm scoes track.
      </p>
      <div className="mt-6">
        <ScormScoesTrackModal emptyState={true} />
      </div>
    </div>
  );
};

