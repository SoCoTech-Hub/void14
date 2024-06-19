"use client";
import { CompleteQtypeDdmarkerDrop } from "@/lib/db/schema/qtypeDdmarkerDrops";
import { trpc } from "@/lib/trpc/client";
import QtypeDdmarkerDropModal from "./QtypeDdmarkerDropModal";


export default function QtypeDdmarkerDropList({ qtypeDdmarkerDrops }: { qtypeDdmarkerDrops: CompleteQtypeDdmarkerDrop[] }) {
  const { data: q } = trpc.qtypeDdmarkerDrops.getQtypeDdmarkerDrops.useQuery(undefined, {
    initialData: { qtypeDdmarkerDrops },
    refetchOnMount: false,
  });

  if (q.qtypeDdmarkerDrops.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeDdmarkerDrops.map((qtypeDdmarkerDrop) => (
        <QtypeDdmarkerDrop qtypeDdmarkerDrop={qtypeDdmarkerDrop} key={qtypeDdmarkerDrop.id} />
      ))}
    </ul>
  );
}

const QtypeDdmarkerDrop = ({ qtypeDdmarkerDrop }: { qtypeDdmarkerDrop: CompleteQtypeDdmarkerDrop }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeDdmarkerDrop.choice}</div>
      </div>
      <QtypeDdmarkerDropModal qtypeDdmarkerDrop={qtypeDdmarkerDrop} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype ddmarker drops
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype ddmarker drop.
      </p>
      <div className="mt-6">
        <QtypeDdmarkerDropModal emptyState={true} />
      </div>
    </div>
  );
};

