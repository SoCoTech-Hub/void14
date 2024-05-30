"use client";
import { CompleteEnrolFlatfile } from "@/lib/db/schema/enrolFlatfiles";
import { trpc } from "@/lib/trpc/client";
import EnrolFlatfileModal from "./EnrolFlatfileModal";


export default function EnrolFlatfileList({ enrolFlatfiles }: { enrolFlatfiles: CompleteEnrolFlatfile[] }) {
  const { data: e } = trpc.enrolFlatfiles.getEnrolFlatfiles.useQuery(undefined, {
    initialData: { enrolFlatfiles },
    refetchOnMount: false,
  });

  if (e.enrolFlatfiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolFlatfiles.map((enrolFlatfile) => (
        <EnrolFlatfile enrolFlatfile={enrolFlatfile} key={enrolFlatfile.id} />
      ))}
    </ul>
  );
}

const EnrolFlatfile = ({ enrolFlatfile }: { enrolFlatfile: CompleteEnrolFlatfile }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolFlatfile.action}</div>
      </div>
      <EnrolFlatfileModal enrolFlatfile={enrolFlatfile} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol flatfiles
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol flatfile.
      </p>
      <div className="mt-6">
        <EnrolFlatfileModal emptyState={true} />
      </div>
    </div>
  );
};

