"use client";
import { CompleteInmail } from "@/lib/db/schema/inmails";
import { trpc } from "@/lib/trpc/client";
import InmailModal from "./InmailModal";


export default function InmailList({ inmails }: { inmails: CompleteInmail[] }) {
  const { data: i } = trpc.inmails.getInmails.useQuery(undefined, {
    initialData: { inmails },
    refetchOnMount: false,
  });

  if (i.inmails.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {i.inmails.map((inmail) => (
        <Inmail inmail={inmail} key={inmail.id} />
      ))}
    </ul>
  );
}

const Inmail = ({ inmail }: { inmail: CompleteInmail }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{inmail.subject}</div>
      </div>
      <InmailModal inmail={inmail} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No inmails
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new inmail.
      </p>
      <div className="mt-6">
        <InmailModal emptyState={true} />
      </div>
    </div>
  );
};

