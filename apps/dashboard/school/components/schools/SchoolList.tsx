"use client";
import { CompleteSchool } from "@/lib/db/schema/schools";
import { trpc } from "@/lib/trpc/client";
import SchoolModal from "./SchoolModal";


export default function SchoolList({ schools }: { schools: CompleteSchool[] }) {
  const { data: s } = trpc.schools.getSchools.useQuery(undefined, {
    initialData: { schools },
    refetchOnMount: false,
  });

  if (s.schools.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.schools.map((school) => (
        <School school={school} key={school.id} />
      ))}
    </ul>
  );
}

const School = ({ school }: { school: CompleteSchool }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{school.name}</div>
      </div>
      <SchoolModal school={school} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No schools
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new school.
      </p>
      <div className="mt-6">
        <SchoolModal emptyState={true} />
      </div>
    </div>
  );
};

