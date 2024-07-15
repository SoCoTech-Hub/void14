"use client";
import { CompleteQtypeDdimageortext } from "@soco/qtype-db/schema/qtypeDdimageortexts";
import { trpc } from "@/lib/trpc/client";
import QtypeDdimageortextModal from "./QtypeDdimageortextModal";


export default function QtypeDdimageortextList({ qtypeDdimageortexts }: { qtypeDdimageortexts: CompleteQtypeDdimageortext[] }) {
  const { data: q } = trpc.qtypeDdimageortexts.getQtypeDdimageortexts.useQuery(undefined, {
    initialData: { qtypeDdimageortexts },
    refetchOnMount: false,
  });

  if (q.qtypeDdimageortexts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeDdimageortexts.map((qtypeDdimageortext) => (
        <QtypeDdimageortext qtypeDdimageortext={qtypeDdimageortext} key={qtypeDdimageortext.id} />
      ))}
    </ul>
  );
}

const QtypeDdimageortext = ({ qtypeDdimageortext }: { qtypeDdimageortext: CompleteQtypeDdimageortext }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeDdimageortext.correctFeedback}</div>
      </div>
      <QtypeDdimageortextModal qtypeDdimageortext={qtypeDdimageortext} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype ddimageortexts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype ddimageortext.
      </p>
      <div className="mt-6">
        <QtypeDdimageortextModal emptyState={true} />
      </div>
    </div>
  );
};

