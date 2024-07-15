"use client";
import { CompleteUniversity } from "@soco/universities-db/schema/universities";
import { trpc } from "@/lib/trpc/client";
import UniversityModal from "./UniversityModal";


export default function UniversityList({ universities }: { universities: CompleteUniversity[] }) {
  const { data: u } = trpc.universities.getUniversities.useQuery(undefined, {
    initialData: { universities },
    refetchOnMount: false,
  });

  if (u.universities.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.universities.map((university) => (
        <University university={university} key={university.id} />
      ))}
    </ul>
  );
}

const University = ({ university }: { university: CompleteUniversity }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{university.name}</div>
      </div>
      <UniversityModal university={university} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No universities
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new university.
      </p>
      <div className="mt-6">
        <UniversityModal emptyState={true} />
      </div>
    </div>
  );
};

