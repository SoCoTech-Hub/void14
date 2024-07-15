"use client";
import { CompleteMessageProvider } from "@soco/message-db/schema/messageProviders";
import { trpc } from "@/lib/trpc/client";
import MessageProviderModal from "./MessageProviderModal";


export default function MessageProviderList({ messageProviders }: { messageProviders: CompleteMessageProvider[] }) {
  const { data: m } = trpc.messageProviders.getMessageProviders.useQuery(undefined, {
    initialData: { messageProviders },
    refetchOnMount: false,
  });

  if (m.messageProviders.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.messageProviders.map((messageProvider) => (
        <MessageProvider messageProvider={messageProvider} key={messageProvider.id} />
      ))}
    </ul>
  );
}

const MessageProvider = ({ messageProvider }: { messageProvider: CompleteMessageProvider }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{messageProvider.capability}</div>
      </div>
      <MessageProviderModal messageProvider={messageProvider} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No message providers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new message provider.
      </p>
      <div className="mt-6">
        <MessageProviderModal emptyState={true} />
      </div>
    </div>
  );
};

