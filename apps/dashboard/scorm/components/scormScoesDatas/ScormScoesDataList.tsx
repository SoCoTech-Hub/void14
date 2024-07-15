"use client";
import { CompleteScormScoesData } from "@soco/scorm-db/schema/scormScoesDatas";
import { trpc } from "@/lib/trpc/client";
import ScormScoesDataModal from "./ScormScoesDataModal";


export default function ScormScoesDataList({ scormScoesDatas }: { scormScoesDatas: CompleteScormScoesData[] }) {
  const { data: s } = trpc.scormScoesDatas.getScormScoesDatas.useQuery(undefined, {
    initialData: { scormScoesDatas },
    refetchOnMount: false,
  });

  if (s.scormScoesDatas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.scormScoesDatas.map((scormScoesData) => (
        <ScormScoesData scormScoesData={scormScoesData} key={scormScoesData.scormScoesData.id} />
      ))}
    </ul>
  );
}

const ScormScoesData = ({ scormScoesData }: { scormScoesData: CompleteScormScoesData }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{scormScoesData.scormScoesData.name}</div>
      </div>
      <ScormScoesDataModal scormScoesData={scormScoesData.scormScoesData} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No scorm scoes datas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new scorm scoes data.
      </p>
      <div className="mt-6">
        <ScormScoesDataModal emptyState={true} />
      </div>
    </div>
  );
};

