"use client";
import { CompleteBigBlueButtonBn } from "@soco/big-blue-button-db/schema/bigBlueButtonBns";
import { trpc } from "@/lib/trpc/client";
import BigBlueButtonBnModal from "./BigBlueButtonBnModal";


export default function BigBlueButtonBnList({ bigBlueButtonBns }: { bigBlueButtonBns: CompleteBigBlueButtonBn[] }) {
  const { data: b } = trpc.bigBlueButtonBns.getBigBlueButtonBns.useQuery(undefined, {
    initialData: { bigBlueButtonBns },
    refetchOnMount: false,
  });

  if (b.bigBlueButtonBns.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {b.bigBlueButtonBns.map((bigBlueButtonBn) => (
        <BigBlueButtonBn bigBlueButtonBn={bigBlueButtonBn} key={bigBlueButtonBn.id} />
      ))}
    </ul>
  );
}

const BigBlueButtonBn = ({ bigBlueButtonBn }: { bigBlueButtonBn: CompleteBigBlueButtonBn }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{bigBlueButtonBn.clientType}</div>
      </div>
      <BigBlueButtonBnModal bigBlueButtonBn={bigBlueButtonBn} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No big blue button bns
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new big blue button bn.
      </p>
      <div className="mt-6">
        <BigBlueButtonBnModal emptyState={true} />
      </div>
    </div>
  );
};

