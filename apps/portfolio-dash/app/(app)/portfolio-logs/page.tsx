import PortfolioLogList from "@/components/portfolioLogs/PortfolioLogList";
import NewPortfolioLogModal from "@/components/portfolioLogs/PortfolioLogModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function PortfolioLogs() {
  await checkAuth();
  const { portfolioLogs } = await api.portfolioLogs.getPortfolioLogs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Portfolio Logs</h1>
        <NewPortfolioLogModal />
      </div>
      <PortfolioLogList portfolioLogs={portfolioLogs} />
    </main>
  );
}
