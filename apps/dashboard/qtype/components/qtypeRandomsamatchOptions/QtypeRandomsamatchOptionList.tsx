"use client";
import { CompleteQtypeRandomsamatchOption } from "@soco/qtype-db/schema/qtypeRandomsamatchOptions";
import { trpc } from "@/lib/trpc/client";
import QtypeRandomsamatchOptionModal from "./QtypeRandomsamatchOptionModal";


export default function QtypeRandomsamatchOptionList({ qtypeRandomsamatchOptions }: { qtypeRandomsamatchOptions: CompleteQtypeRandomsamatchOption[] }) {
  const { data: q } = trpc.qtypeRandomsamatchOptions.getQtypeRandomsamatchOptions.useQuery(undefined, {
    initialData: { qtypeRandomsamatchOptions },
    refetchOnMount: false,
  });

  if (q.qtypeRandomsamatchOptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeRandomsamatchOptions.map((qtypeRandomsamatchOption) => (
        <QtypeRandomsamatchOption qtypeRandomsamatchOption={qtypeRandomsamatchOption} key={qtypeRandomsamatchOption.id} />
      ))}
    </ul>
  );
}

const QtypeRandomsamatchOption = ({ qtypeRandomsamatchOption }: { qtypeRandomsamatchOption: CompleteQtypeRandomsamatchOption }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeRandomsamatchOption.choose}</div>
      </div>
      <QtypeRandomsamatchOptionModal qtypeRandomsamatchOption={qtypeRandomsamatchOption} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype randomsamatch options
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype randomsamatch option.
      </p>
      <div className="mt-6">
        <QtypeRandomsamatchOptionModal emptyState={true} />
      </div>
    </div>
  );
};

