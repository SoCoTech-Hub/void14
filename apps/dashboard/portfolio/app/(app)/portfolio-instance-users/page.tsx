import PortfolioInstanceUserList from "@/components/portfolioInstanceUsers/PortfolioInstanceUserList";
import NewPortfolioInstanceUserModal from "@/components/portfolioInstanceUsers/PortfolioInstanceUserModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function PortfolioInstanceUsers() {
  await checkAuth();
  const { portfolioInstanceUsers } = await api.portfolioInstanceUsers.getPortfolioInstanceUsers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Portfolio Instance Users</h1>
        <NewPortfolioInstanceUserModal />
      </div>
      <PortfolioInstanceUserList portfolioInstanceUsers={portfolioInstanceUsers} />
    </main>
  );
}
