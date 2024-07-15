"use client";
import { CompleteQtypeDdimageortextDrop } from "@soco/qtype-db/schema/qtypeDdimageortextDrops";
import { trpc } from "@/lib/trpc/client";
import QtypeDdimageortextDropModal from "./QtypeDdimageortextDropModal";


export default function QtypeDdimageortextDropList({ qtypeDdimageortextDrops }: { qtypeDdimageortextDrops: CompleteQtypeDdimageortextDrop[] }) {
  const { data: q } = trpc.qtypeDdimageortextDrops.getQtypeDdimageortextDrops.useQuery(undefined, {
    initialData: { qtypeDdimageortextDrops },
    refetchOnMount: false,
  });

  if (q.qtypeDdimageortextDrops.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeDdimageortextDrops.map((qtypeDdimageortextDrop) => (
        <QtypeDdimageortextDrop qtypeDdimageortextDrop={qtypeDdimageortextDrop} key={qtypeDdimageortextDrop.id} />
      ))}
    </ul>
  );
}

const QtypeDdimageortextDrop = ({ qtypeDdimageortextDrop }: { qtypeDdimageortextDrop: CompleteQtypeDdimageortextDrop }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeDdimageortextDrop.choice}</div>
      </div>
      <QtypeDdimageortextDropModal qtypeDdimageortextDrop={qtypeDdimageortextDrop} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype ddimageortext drops
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype ddimageortext drop.
      </p>
      <div className="mt-6">
        <QtypeDdimageortextDropModal emptyState={true} />
      </div>
    </div>
  );
};

