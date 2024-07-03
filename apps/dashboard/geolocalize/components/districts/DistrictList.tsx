"use client";
import { CompleteDistrict } from "@/lib/db/schema/districts";
import { trpc } from "@/lib/trpc/client";
import DistrictModal from "./DistrictModal";


export default function DistrictList({ districts }: { districts: CompleteDistrict[] }) {
  const { data: d } = trpc.districts.getDistricts.useQuery(undefined, {
    initialData: { districts },
    refetchOnMount: false,
  });

  if (d.districts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.districts.map((district) => (
        <District district={district} key={district.id} />
      ))}
    </ul>
  );
}

const District = ({ district }: { district: CompleteDistrict }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{district.name}</div>
      </div>
      <DistrictModal district={district} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No districts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new district.
      </p>
      <div className="mt-6">
        <DistrictModal emptyState={true} />
      </div>
    </div>
  );
};

