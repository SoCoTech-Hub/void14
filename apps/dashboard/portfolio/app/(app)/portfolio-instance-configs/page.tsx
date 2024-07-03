import PortfolioInstanceConfigList from "@/components/portfolioInstanceConfigs/PortfolioInstanceConfigList";
import NewPortfolioInstanceConfigModal from "@/components/portfolioInstanceConfigs/PortfolioInstanceConfigModal";
import { api } from "@/lib/trpc/api";

export default async function PortfolioInstanceConfigs() {
  const { portfolioInstanceConfigs } = await api.portfolioInstanceConfigs.getPortfolioInstanceConfigs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Portfolio Instance Configs</h1>
        <NewPortfolioInstanceConfigModal />
      </div>
      <PortfolioInstanceConfigList portfolioInstanceConfigs={portfolioInstanceConfigs} />
    </main>
  );
}
