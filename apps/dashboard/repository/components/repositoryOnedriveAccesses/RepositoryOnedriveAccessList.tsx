"use client";
import { CompleteRepositoryOnedriveAccess } from "@soco/repository-db/schema/repositoryOnedriveAccesses";
import { trpc } from "@/lib/trpc/client";
import RepositoryOnedriveAccessModal from "./RepositoryOnedriveAccessModal";


export default function RepositoryOnedriveAccessList({ repositoryOnedriveAccesses }: { repositoryOnedriveAccesses: CompleteRepositoryOnedriveAccess[] }) {
  const { data: r } = trpc.repositoryOnedriveAccesses.getRepositoryOnedriveAccesses.useQuery(undefined, {
    initialData: { repositoryOnedriveAccesses },
    refetchOnMount: false,
  });

  if (r.repositoryOnedriveAccesses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.repositoryOnedriveAccesses.map((repositoryOnedriveAccess) => (
        <RepositoryOnedriveAccess repositoryOnedriveAccess={repositoryOnedriveAccess} key={repositoryOnedriveAccess.id} />
      ))}
    </ul>
  );
}

const RepositoryOnedriveAccess = ({ repositoryOnedriveAccess }: { repositoryOnedriveAccess: CompleteRepositoryOnedriveAccess }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{repositoryOnedriveAccess.itemId}</div>
      </div>
      <RepositoryOnedriveAccessModal repositoryOnedriveAccess={repositoryOnedriveAccess} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No repository onedrive accesses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new repository onedrive access.
      </p>
      <div className="mt-6">
        <RepositoryOnedriveAccessModal emptyState={true} />
      </div>
    </div>
  );
};

