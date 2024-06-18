"use client";
import { CompleteImscp } from "@/lib/db/schema/imscps";
import { trpc } from "@/lib/trpc/client";
import ImscpModal from "./ImscpModal";


export default function ImscpList({ imscps }: { imscps: CompleteImscp[] }) {
  const { data: i } = trpc.imscps.getImscps.useQuery(undefined, {
    initialData: { imscps },
    refetchOnMount: false,
  });

  if (i.imscps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {i.imscps.map((imscp) => (
        <Imscp imscp={imscp} key={imscp.id} />
      ))}
    </ul>
  );
}

const Imscp = ({ imscp }: { imscp: CompleteImscp }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{imscp.course}</div>
      </div>
      <ImscpModal imscp={imscp} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No imscps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new imscp.
      </p>
      <div className="mt-6">
        <ImscpModal emptyState={true} />
      </div>
    </div>
  );
};

