"use client";
import { CompleteQtypeDdmarkerDrag } from "@/lib/db/schema/qtypeDdmarkerDrags";
import { trpc } from "@/lib/trpc/client";
import QtypeDdmarkerDragModal from "./QtypeDdmarkerDragModal";


export default function QtypeDdmarkerDragList({ qtypeDdmarkerDrags }: { qtypeDdmarkerDrags: CompleteQtypeDdmarkerDrag[] }) {
  const { data: q } = trpc.qtypeDdmarkerDrags.getQtypeDdmarkerDrags.useQuery(undefined, {
    initialData: { qtypeDdmarkerDrags },
    refetchOnMount: false,
  });

  if (q.qtypeDdmarkerDrags.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeDdmarkerDrags.map((qtypeDdmarkerDrag) => (
        <QtypeDdmarkerDrag qtypeDdmarkerDrag={qtypeDdmarkerDrag} key={qtypeDdmarkerDrag.id} />
      ))}
    </ul>
  );
}

const QtypeDdmarkerDrag = ({ qtypeDdmarkerDrag }: { qtypeDdmarkerDrag: CompleteQtypeDdmarkerDrag }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeDdmarkerDrag.infinite}</div>
      </div>
      <QtypeDdmarkerDragModal qtypeDdmarkerDrag={qtypeDdmarkerDrag} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype ddmarker drags
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype ddmarker drag.
      </p>
      <div className="mt-6">
        <QtypeDdmarkerDragModal emptyState={true} />
      </div>
    </div>
  );
};

