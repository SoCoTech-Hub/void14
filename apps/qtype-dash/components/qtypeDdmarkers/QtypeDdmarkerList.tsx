"use client";
import { CompleteQtypeDdmarker } from "@/lib/db/schema/qtypeDdmarkers";
import { trpc } from "@/lib/trpc/client";
import QtypeDdmarkerModal from "./QtypeDdmarkerModal";


export default function QtypeDdmarkerList({ qtypeDdmarkers }: { qtypeDdmarkers: CompleteQtypeDdmarker[] }) {
  const { data: q } = trpc.qtypeDdmarkers.getQtypeDdmarkers.useQuery(undefined, {
    initialData: { qtypeDdmarkers },
    refetchOnMount: false,
  });

  if (q.qtypeDdmarkers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeDdmarkers.map((qtypeDdmarker) => (
        <QtypeDdmarker qtypeDdmarker={qtypeDdmarker} key={qtypeDdmarker.id} />
      ))}
    </ul>
  );
}

const QtypeDdmarker = ({ qtypeDdmarker }: { qtypeDdmarker: CompleteQtypeDdmarker }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeDdmarker.correctFeedback}</div>
      </div>
      <QtypeDdmarkerModal qtypeDdmarker={qtypeDdmarker} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype ddmarkers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype ddmarker.
      </p>
      <div className="mt-6">
        <QtypeDdmarkerModal emptyState={true} />
      </div>
    </div>
  );
};

