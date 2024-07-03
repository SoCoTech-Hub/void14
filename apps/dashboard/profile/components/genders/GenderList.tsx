"use client";
import { CompleteGender } from "@/lib/db/schema/genders";
import { trpc } from "@/lib/trpc/client";
import GenderModal from "./GenderModal";


export default function GenderList({ genders }: { genders: CompleteGender[] }) {
  const { data: g } = trpc.genders.getGenders.useQuery(undefined, {
    initialData: { genders },
    refetchOnMount: false,
  });

  if (g.genders.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.genders.map((gender) => (
        <Gender gender={gender} key={gender.id} />
      ))}
    </ul>
  );
}

const Gender = ({ gender }: { gender: CompleteGender }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gender.name}</div>
      </div>
      <GenderModal gender={gender} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No genders
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gender.
      </p>
      <div className="mt-6">
        <GenderModal emptyState={true} />
      </div>
    </div>
  );
};

