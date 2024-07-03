"use client";
import { CompleteQtypeShortanswerOption } from "@/lib/db/schema/qtypeShortanswerOptions";
import { trpc } from "@/lib/trpc/client";
import QtypeShortanswerOptionModal from "./QtypeShortanswerOptionModal";


export default function QtypeShortanswerOptionList({ qtypeShortanswerOptions }: { qtypeShortanswerOptions: CompleteQtypeShortanswerOption[] }) {
  const { data: q } = trpc.qtypeShortanswerOptions.getQtypeShortanswerOptions.useQuery(undefined, {
    initialData: { qtypeShortanswerOptions },
    refetchOnMount: false,
  });

  if (q.qtypeShortanswerOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeShortanswerOptions.map((qtypeShortanswerOption) => (
        <QtypeShortanswerOption qtypeShortanswerOption={qtypeShortanswerOption} key={qtypeShortanswerOption.id} />
      ))}
    </ul>
  );
}

const QtypeShortanswerOption = ({ qtypeShortanswerOption }: { qtypeShortanswerOption: CompleteQtypeShortanswerOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeShortanswerOption.questionId}</div>
      </div>
      <QtypeShortanswerOptionModal qtypeShortanswerOption={qtypeShortanswerOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype shortanswer options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype shortanswer option.
      </p>
      <div className="mt-6">
        <QtypeShortanswerOptionModal emptyState={true} />
      </div>
    </div>
  );
};

