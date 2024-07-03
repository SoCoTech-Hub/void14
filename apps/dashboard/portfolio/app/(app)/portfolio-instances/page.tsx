import PortfolioInstanceList from "@/components/portfolioInstances/PortfolioInstanceList";
import NewPortfolioInstanceModal from "@/components/portfolioInstances/PortfolioInstanceModal";
import { api } from "@/lib/trpc/api";

export default async function PortfolioInstances() {
  const { portfolioInstances } = await api.portfolioInstances.getPortfolioInstances.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Portfolio Instances</h1>
        <NewPortfolioInstanceModal />
      </div>
      <PortfolioInstanceList portfolioInstances={portfolioInstances} />
    </main>
  );
}
