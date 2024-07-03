"use client";
import { CompleteSupportTicket } from "@/lib/db/schema/supportTickets";
import { trpc } from "@/lib/trpc/client";
import SupportTicketModal from "./SupportTicketModal";


export default function SupportTicketList({ supportTickets }: { supportTickets: CompleteSupportTicket[] }) {
  const { data: s } = trpc.supportTickets.getSupportTickets.useQuery(undefined, {
    initialData: { supportTickets },
    refetchOnMount: false,
  });

  if (s.supportTickets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.supportTickets.map((supportTicket) => (
        <SupportTicket supportTicket={supportTicket} key={supportTicket.id} />
      ))}
    </ul>
  );
}

const SupportTicket = ({ supportTicket }: { supportTicket: CompleteSupportTicket }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{supportTicket.name}</div>
      </div>
      <SupportTicketModal supportTicket={supportTicket} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No support tickets
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new support ticket.
      </p>
      <div className="mt-6">
        <SupportTicketModal emptyState={true} />
      </div>
    </div>
  );
};

