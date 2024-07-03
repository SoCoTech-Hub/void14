"use client";
import { CompleteQtypeDdimageortextDrag } from "@/lib/db/schema/qtypeDdimageortextDrags";
import { trpc } from "@/lib/trpc/client";
import QtypeDdimageortextDragModal from "./QtypeDdimageortextDragModal";


export default function QtypeDdimageortextDragList({ qtypeDdimageortextDrags }: { qtypeDdimageortextDrags: CompleteQtypeDdimageortextDrag[] }) {
  const { data: q } = trpc.qtypeDdimageortextDrags.getQtypeDdimageortextDrags.useQuery(undefined, {
    initialData: { qtypeDdimageortextDrags },
    refetchOnMount: false,
  });

  if (q.qtypeDdimageortextDrags.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeDdimageortextDrags.map((qtypeDdimageortextDrag) => (
        <QtypeDdimageortextDrag qtypeDdimageortextDrag={qtypeDdimageortextDrag} key={qtypeDdimageortextDrag.id} />
      ))}
    </ul>
  );
}

const QtypeDdimageortextDrag = ({ qtypeDdimageortextDrag }: { qtypeDdimageortextDrag: CompleteQtypeDdimageortextDrag }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeDdimageortextDrag.dragGroup}</div>
      </div>
      <QtypeDdimageortextDragModal qtypeDdimageortextDrag={qtypeDdimageortextDrag} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype ddimageortext drags
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype ddimageortext drag.
      </p>
      <div className="mt-6">
        <QtypeDdimageortextDragModal emptyState={true} />
      </div>
    </div>
  );
};

