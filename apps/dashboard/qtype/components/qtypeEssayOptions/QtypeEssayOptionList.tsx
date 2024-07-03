"use client";
import { CompleteQtypeEssayOption } from "@/lib/db/schema/qtypeEssayOptions";
import { trpc } from "@/lib/trpc/client";
import QtypeEssayOptionModal from "./QtypeEssayOptionModal";


export default function QtypeEssayOptionList({ qtypeEssayOptions }: { qtypeEssayOptions: CompleteQtypeEssayOption[] }) {
  const { data: q } = trpc.qtypeEssayOptions.getQtypeEssayOptions.useQuery(undefined, {
    initialData: { qtypeEssayOptions },
    refetchOnMount: false,
  });

  if (q.qtypeEssayOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeEssayOptions.map((qtypeEssayOption) => (
        <QtypeEssayOption qtypeEssayOption={qtypeEssayOption} key={qtypeEssayOption.id} />
      ))}
    </ul>
  );
}

const QtypeEssayOption = ({ qtypeEssayOption }: { qtypeEssayOption: CompleteQtypeEssayOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeEssayOption.attachments}</div>
      </div>
      <QtypeEssayOptionModal qtypeEssayOption={qtypeEssayOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype essay options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype essay option.
      </p>
      <div className="mt-6">
        <QtypeEssayOptionModal emptyState={true} />
      </div>
    </div>
  );
};

