"use client";
import { CompleteProvince } from "@soco/geolocalize-db/schema/provinces";
import { trpc } from "@/lib/trpc/client";
import ProvinceModal from "./ProvinceModal";


export default function ProvinceList({ provinces }: { provinces: CompleteProvince[] }) {
  const { data: p } = trpc.provinces.getProvinces.useQuery(undefined, {
    initialData: { provinces },
    refetchOnMount: false,
  });

  if (p.provinces.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.provinces.map((province) => (
        <Province province={province} key={province.id} />
      ))}
    </ul>
  );
}

const Province = ({ province }: { province: CompleteProvince }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{province.name}</div>
      </div>
      <ProvinceModal province={province} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No provinces
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new province.
      </p>
      <div className="mt-6">
        <ProvinceModal emptyState={true} />
      </div>
    </div>
  );
};

