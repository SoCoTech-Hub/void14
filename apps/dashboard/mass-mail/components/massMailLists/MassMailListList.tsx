"use client";
import { CompleteMassMailList } from "@soco/mass-mail-db/schema/massMailLists";
import { trpc } from "@/lib/trpc/client";
import MassMailListModal from "./MassMailListModal";


export default function MassMailListList({ massMailLists }: { massMailLists: CompleteMassMailList[] }) {
  const { data: m } = trpc.massMailLists.getMassMailLists.useQuery(undefined, {
    initialData: { massMailLists },
    refetchOnMount: false,
  });

  if (m.massMailLists.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.massMailLists.map((massMailList) => (
        <MassMailList massMailList={massMailList} key={massMailList.id} />
      ))}
    </ul>
  );
}

const MassMailList = ({ massMailList }: { massMailList: CompleteMassMailList }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{massMailList.name}</div>
      </div>
      <MassMailListModal massMailList={massMailList} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mass mail lists
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mass mail list.
      </p>
      <div className="mt-6">
        <MassMailListModal emptyState={true} />
      </div>
    </div>
  );
};

