"use client";
import { CompleteLogDisplay } from "@/lib/db/schema/logDisplays";
import { trpc } from "@/lib/trpc/client";
import LogDisplayModal from "./LogDisplayModal";


export default function LogDisplayList({ logDisplays }: { logDisplays: CompleteLogDisplay[] }) {
  const { data: l } = trpc.logDisplays.getLogDisplays.useQuery(undefined, {
    initialData: { logDisplays },
    refetchOnMount: false,
  });

  if (l.logDisplays.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.logDisplays.map((logDisplay) => (
        <LogDisplay logDisplay={logDisplay} key={logDisplay.id} />
      ))}
    </ul>
  );
}

const LogDisplay = ({ logDisplay }: { logDisplay: CompleteLogDisplay }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{logDisplay.action}</div>
      </div>
      <LogDisplayModal logDisplay={logDisplay} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No log displays
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new log display.
      </p>
      <div className="mt-6">
        <LogDisplayModal emptyState={true} />
      </div>
    </div>
  );
};

