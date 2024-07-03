"use client";
import { CompleteQtypeMultichoiceOption } from "@/lib/db/schema/qtypeMultichoiceOptions";
import { trpc } from "@/lib/trpc/client";
import QtypeMultichoiceOptionModal from "./QtypeMultichoiceOptionModal";


export default function QtypeMultichoiceOptionList({ qtypeMultichoiceOptions }: { qtypeMultichoiceOptions: CompleteQtypeMultichoiceOption[] }) {
  const { data: q } = trpc.qtypeMultichoiceOptions.getQtypeMultichoiceOptions.useQuery(undefined, {
    initialData: { qtypeMultichoiceOptions },
    refetchOnMount: false,
  });

  if (q.qtypeMultichoiceOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeMultichoiceOptions.map((qtypeMultichoiceOption) => (
        <QtypeMultichoiceOption qtypeMultichoiceOption={qtypeMultichoiceOption} key={qtypeMultichoiceOption.id} />
      ))}
    </ul>
  );
}

const QtypeMultichoiceOption = ({ qtypeMultichoiceOption }: { qtypeMultichoiceOption: CompleteQtypeMultichoiceOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeMultichoiceOption.answerNumbering}</div>
      </div>
      <QtypeMultichoiceOptionModal qtypeMultichoiceOption={qtypeMultichoiceOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype multichoice options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype multichoice option.
      </p>
      <div className="mt-6">
        <QtypeMultichoiceOptionModal emptyState={true} />
      </div>
    </div>
  );
};

