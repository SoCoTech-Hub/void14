"use client";
import { CompleteScormSeqMapinfo } from "@/lib/db/schema/scormSeqMapinfos";
import { trpc } from "@/lib/trpc/client";
import ScormSeqMapinfoModal from "./ScormSeqMapinfoModal";


export default function ScormSeqMapinfoList({ scormSeqMapinfos }: { scormSeqMapinfos: CompleteScormSeqMapinfo[] }) {
  const { data: s } = trpc.scormSeqMapinfos.getScormSeqMapinfos.useQuery(undefined, {
    initialData: { scormSeqMapinfos },
    refetchOnMount: false,
  });

  if (s.scormSeqMapinfos.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormSeqMapinfos.map((scormSeqMapinfo) => (
        <ScormSeqMapinfo scormSeqMapinfo={scormSeqMapinfo} key={scormSeqMapinfo.scormSeqMapinfo.id} />
      ))}
    </ul>
  );
}

const ScormSeqMapinfo = ({ scormSeqMapinfo }: { scormSeqMapinfo: CompleteScormSeqMapinfo }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormSeqMapinfo.scormSeqMapinfo.scormSeqObjectiveId}</div>
      </div>
      <ScormSeqMapinfoModal scormSeqMapinfo={scormSeqMapinfo.scormSeqMapinfo} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm seq mapinfos
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm seq mapinfo.
      </p>
      <div className="mt-6">
        <ScormSeqMapinfoModal emptyState={true} />
      </div>
    </div>
  );
};

