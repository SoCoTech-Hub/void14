"use client";
import { CompleteOauth2SystemAccount } from "@soco/oauth2-db/schema/oauth2SystemAccounts";
import { trpc } from "@/lib/trpc/client";
import Oauth2SystemAccountModal from "./Oauth2SystemAccountModal";


export default function Oauth2SystemAccountList({ oauth2SystemAccounts }: { oauth2SystemAccounts: CompleteOauth2SystemAccount[] }) {
  const { data: o } = trpc.oauth2SystemAccounts.getOauth2SystemAccounts.useQuery(undefined, {
    initialData: { oauth2SystemAccounts },
    refetchOnMount: false,
  });

  if (o.oauth2SystemAccounts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.oauth2SystemAccounts.map((oauth2SystemAccount) => (
        <Oauth2SystemAccount oauth2SystemAccount={oauth2SystemAccount} key={oauth2SystemAccount.oauth2SystemAccount.id} />
      ))}
    </ul>
  );
}

const Oauth2SystemAccount = ({ oauth2SystemAccount }: { oauth2SystemAccount: CompleteOauth2SystemAccount }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{oauth2SystemAccount.oauth2SystemAccount.email}</div>
      </div>
      <Oauth2SystemAccountModal oauth2SystemAccount={oauth2SystemAccount.oauth2SystemAccount} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No oauth2 system accounts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new oauth2 system account.
      </p>
      <div className="mt-6">
        <Oauth2SystemAccountModal emptyState={true} />
      </div>
    </div>
  );
};

