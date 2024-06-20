import PortfolioMaharaQueueList from "@/components/portfolioMaharaQueues/PortfolioMaharaQueueList";
import NewPortfolioMaharaQueueModal from "@/components/portfolioMaharaQueues/PortfolioMaharaQueueModal";
import { api } from "@/lib/trpc/api";

export default async function PortfolioMaharaQueues() {
  const { portfolioMaharaQueues } = await api.portfolioMaharaQueues.getPortfolioMaharaQueues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Portfolio Mahara Queues</h1>
        <NewPortfolioMaharaQueueModal />
      </div>
      <PortfolioMaharaQueueList portfolioMaharaQueues={portfolioMaharaQueues} />
    </main>
  );
}
