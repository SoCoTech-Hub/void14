"use client";
import { CompleteBursaryResponse } from "@/lib/db/schema/bursaryResponses";
import { trpc } from "@/lib/trpc/client";
import BursaryResponseModal from "./BursaryResponseModal";


export default function BursaryResponseList({ bursaryResponses }: { bursaryResponses: CompleteBursaryResponse[] }) {
  const { data: b } = trpc.bursaryResponses.getBursaryResponses.useQuery(undefined, {
    initialData: { bursaryResponses },
    refetchOnMount: false,
  });

  if (b.bursaryResponses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bursaryResponses.map((bursaryResponse) => (
        <BursaryResponse bursaryResponse={bursaryResponse} key={bursaryResponse.bursaryResponse.id} />
      ))}
    </ul>
  );
}

const BursaryResponse = ({ bursaryResponse }: { bursaryResponse: CompleteBursaryResponse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bursaryResponse.bursaryResponse.bursaryId}</div>
      </div>
      <BursaryResponseModal bursaryResponse={bursaryResponse.bursaryResponse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No bursary responses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new bursary response.
      </p>
      <div className="mt-6">
        <BursaryResponseModal emptyState={true} />
      </div>
    </div>
  );
};

