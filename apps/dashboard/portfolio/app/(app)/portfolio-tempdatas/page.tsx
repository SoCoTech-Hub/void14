import PortfolioTempdataList from "@/components/portfolioTempdatas/PortfolioTempdataList";
import NewPortfolioTempdataModal from "@/components/portfolioTempdatas/PortfolioTempdataModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function PortfolioTempdatas() {
  await checkAuth();
  const { portfolioTempdatas } = await api.portfolioTempdatas.getPortfolioTempdatas.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Portfolio Tempdatas</h1>
        <NewPortfolioTempdataModal />
      </div>
      <PortfolioTempdataList portfolioTempdatas={portfolioTempdatas} />
    </main>
  );
}
