import SupportStatusList from "@/components/supportStatuses/SupportStatusList";
import NewSupportStatusModal from "@/components/supportStatuses/SupportStatusModal";
import { api } from "@/lib/trpc/api";

export default async function SupportStatuses() {
  const { supportStatuses } = await api.supportStatuses.getSupportStatuses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Support Statuses</h1>
        <NewSupportStatusModal />
      </div>
      <SupportStatusList supportStatuses={supportStatuses} />
    </main>
  );
}
