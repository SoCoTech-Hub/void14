"use client";
import { CompleteMessageContact } from "@/lib/db/schema/messageContacts";
import { trpc } from "@/lib/trpc/client";
import MessageContactModal from "./MessageContactModal";


export default function MessageContactList({ messageContacts }: { messageContacts: CompleteMessageContact[] }) {
  const { data: m } = trpc.messageContacts.getMessageContacts.useQuery(undefined, {
    initialData: { messageContacts },
    refetchOnMount: false,
  });

  if (m.messageContacts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageContacts.map((messageContact) => (
        <MessageContact messageContact={messageContact} key={messageContact.id} />
      ))}
    </ul>
  );
}

const MessageContact = ({ messageContact }: { messageContact: CompleteMessageContact }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageContact.contactId}</div>
      </div>
      <MessageContactModal messageContact={messageContact} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message contacts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message contact.
      </p>
      <div className="mt-6">
        <MessageContactModal emptyState={true} />
      </div>
    </div>
  );
};

