"use client";
import { CompleteQtypeMatchOption } from "@/lib/db/schema/qtypeMatchOptions";
import { trpc } from "@/lib/trpc/client";
import QtypeMatchOptionModal from "./QtypeMatchOptionModal";


export default function QtypeMatchOptionList({ qtypeMatchOptions }: { qtypeMatchOptions: CompleteQtypeMatchOption[] }) {
  const { data: q } = trpc.qtypeMatchOptions.getQtypeMatchOptions.useQuery(undefined, {
    initialData: { qtypeMatchOptions },
    refetchOnMount: false,
  });

  if (q.qtypeMatchOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeMatchOptions.map((qtypeMatchOption) => (
        <QtypeMatchOption qtypeMatchOption={qtypeMatchOption} key={qtypeMatchOption.id} />
      ))}
    </ul>
  );
}

const QtypeMatchOption = ({ qtypeMatchOption }: { qtypeMatchOption: CompleteQtypeMatchOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeMatchOption.correctFeedback}</div>
      </div>
      <QtypeMatchOptionModal qtypeMatchOption={qtypeMatchOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype match options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype match option.
      </p>
      <div className="mt-6">
        <QtypeMatchOptionModal emptyState={true} />
      </div>
    </div>
  );
};

