"use client";
import { CompleteEnrol } from "@soco/enrol-db/schema/enrols";
import { trpc } from "@/lib/trpc/client";
import EnrolModal from "./EnrolModal";


export default function EnrolList({ enrols }: { enrols: CompleteEnrol[] }) {
  const { data: e } = trpc.enrols.getEnrols.useQuery(undefined, {
    initialData: { enrols },
    refetchOnMount: false,
  });

  if (e.enrols.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrols.map((enrol) => (
        <Enrol enrol={enrol} key={enrol.id} />
      ))}
    </ul>
  );
}

const Enrol = ({ enrol }: { enrol: CompleteEnrol }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrol.cost}</div>
      </div>
      <EnrolModal enrol={enrol} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrols
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol.
      </p>
      <div className="mt-6">
        <EnrolModal emptyState={true} />
      </div>
    </div>
  );
};

