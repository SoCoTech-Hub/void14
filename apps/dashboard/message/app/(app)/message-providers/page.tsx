import MessageProviderList from "@/components/messageProviders/MessageProviderList";
import NewMessageProviderModal from "@/components/messageProviders/MessageProviderModal";
import { api } from "@/lib/trpc/api";

export default async function MessageProviders() {
  const { messageProviders } = await api.messageProviders.getMessageProviders.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Message Providers</h1>
        <NewMessageProviderModal />
      </div>
      <MessageProviderList messageProviders={messageProviders} />
    </main>
  );
}
