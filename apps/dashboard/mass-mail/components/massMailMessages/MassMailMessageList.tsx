"use client";
import { CompleteMassMailMessage } from "@soco/mass-mail-db/schema/massMailMessages";
import { trpc } from "@/lib/trpc/client";
import MassMailMessageModal from "./MassMailMessageModal";


export default function MassMailMessageList({ massMailMessages }: { massMailMessages: CompleteMassMailMessage[] }) {
  const { data: m } = trpc.massMailMessages.getMassMailMessages.useQuery(undefined, {
    initialData: { massMailMessages },
    refetchOnMount: false,
  });

  if (m.massMailMessages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.massMailMessages.map((massMailMessage) => (
        <MassMailMessage massMailMessage={massMailMessage} key={massMailMessage.id} />
      ))}
    </ul>
  );
}

const MassMailMessage = ({ massMailMessage }: { massMailMessage: CompleteMassMailMessage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{massMailMessage.name}</div>
      </div>
      <MassMailMessageModal massMailMessage={massMailMessage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No mass mail messages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new mass mail message.
      </p>
      <div className="mt-6">
        <MassMailMessageModal emptyState={true} />
      </div>
    </div>
  );
};

