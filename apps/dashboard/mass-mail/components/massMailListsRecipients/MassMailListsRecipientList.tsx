"use client";
import { CompleteMassMailListsRecipient } from "@soco/mass-mail-db/schema/massMailListsRecipients";
import { trpc } from "@/lib/trpc/client";
import MassMailListsRecipientModal from "./MassMailListsRecipientModal";


export default function MassMailListsRecipientList({ massMailListsRecipients }: { massMailListsRecipients: CompleteMassMailListsRecipient[] }) {
  const { data: m } = trpc.massMailListsRecipients.getMassMailListsRecipients.useQuery(undefined, {
    initialData: { massMailListsRecipients },
    refetchOnMount: false,
  });

  if (m.massMailListsRecipients.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.massMailListsRecipients.map((massMailListsRecipient) => (
        <MassMailListsRecipient massMailListsRecipient={massMailListsRecipient} key={massMailListsRecipient.massMailListsRecipient.id} />
      ))}
    </ul>
  );
}

const MassMailListsRecipient = ({ massMailListsRecipient }: { massMailListsRecipient: CompleteMassMailListsRecipient }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{massMailListsRecipient.massMailListsRecipient.massMailListId}</div>
      </div>
      <MassMailListsRecipientModal massMailListsRecipient={massMailListsRecipient.massMailListsRecipient} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mass mail lists recipients
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mass mail lists recipient.
      </p>
      <div className="mt-6">
        <MassMailListsRecipientModal emptyState={true} />
      </div>
    </div>
  );
};

