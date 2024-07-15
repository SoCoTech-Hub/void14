import SupportTicketList from "@/components/supportTickets/SupportTicketList";
import NewSupportTicketModal from "@/components/supportTickets/SupportTicketModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function SupportTickets() {
  await checkAuth();
  const { supportTickets } = await api.supportTickets.getSupportTickets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Support Tickets</h1>
        <NewSupportTicketModal />
      </div>
      <SupportTicketList supportTickets={supportTickets} />
    </main>
  );
}
