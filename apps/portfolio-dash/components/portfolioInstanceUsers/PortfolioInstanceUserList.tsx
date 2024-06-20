"use client";
import { CompletePortfolioInstanceUser } from "@/lib/db/schema/portfolioInstanceUsers";
import { trpc } from "@/lib/trpc/client";
import PortfolioInstanceUserModal from "./PortfolioInstanceUserModal";


export default function PortfolioInstanceUserList({ portfolioInstanceUsers }: { portfolioInstanceUsers: CompletePortfolioInstanceUser[] }) {
  const { data: p } = trpc.portfolioInstanceUsers.getPortfolioInstanceUsers.useQuery(undefined, {
    initialData: { portfolioInstanceUsers },
    refetchOnMount: false,
  });

  if (p.portfolioInstanceUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.portfolioInstanceUsers.map((portfolioInstanceUser) => (
        <PortfolioInstanceUser portfolioInstanceUser={portfolioInstanceUser} key={portfolioInstanceUser.portfolioInstanceUser.id} />
      ))}
    </ul>
  );
}

const PortfolioInstanceUser = ({ portfolioInstanceUser }: { portfolioInstanceUser: CompletePortfolioInstanceUser }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{portfolioInstanceUser.portfolioInstanceUser.portfolioInstanceId}</div>
      </div>
      <PortfolioInstanceUserModal portfolioInstanceUser={portfolioInstanceUser.portfolioInstanceUser} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No portfolio instance users
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new portfolio instance user.
      </p>
      <div className="mt-6">
        <PortfolioInstanceUserModal emptyState={true} />
      </div>
    </div>
  );
};

