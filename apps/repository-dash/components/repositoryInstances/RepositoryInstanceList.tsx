"use client";
import { CompleteRepositoryInstance } from "@/lib/db/schema/repositoryInstances";
import { trpc } from "@/lib/trpc/client";
import RepositoryInstanceModal from "./RepositoryInstanceModal";


export default function RepositoryInstanceList({ repositoryInstances }: { repositoryInstances: CompleteRepositoryInstance[] }) {
  const { data: r } = trpc.repositoryInstances.getRepositoryInstances.useQuery(undefined, {
    initialData: { repositoryInstances },
    refetchOnMount: false,
  });

  if (r.repositoryInstances.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.repositoryInstances.map((repositoryInstance) => (
        <RepositoryInstance repositoryInstance={repositoryInstance} key={repositoryInstance.id} />
      ))}
    </ul>
  );
}

const RepositoryInstance = ({ repositoryInstance }: { repositoryInstance: CompleteRepositoryInstance }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{repositoryInstance.contextId}</div>
      </div>
      <RepositoryInstanceModal repositoryInstance={repositoryInstance} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No repository instances
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new repository instance.
      </p>
      <div className="mt-6">
        <RepositoryInstanceModal emptyState={true} />
      </div>
    </div>
  );
};

