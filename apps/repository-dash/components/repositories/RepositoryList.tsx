"use client";
import { CompleteRepository } from "@/lib/db/schema/repositories";
import { trpc } from "@/lib/trpc/client";
import RepositoryModal from "./RepositoryModal";


export default function RepositoryList({ repositories }: { repositories: CompleteRepository[] }) {
  const { data: r } = trpc.repositories.getRepositories.useQuery(undefined, {
    initialData: { repositories },
    refetchOnMount: false,
  });

  if (r.repositories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.repositories.map((repository) => (
        <Repository repository={repository} key={repository.id} />
      ))}
    </ul>
  );
}

const Repository = ({ repository }: { repository: CompleteRepository }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{repository.sortOrder}</div>
      </div>
      <RepositoryModal repository={repository} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No repositories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new repository.
      </p>
      <div className="mt-6">
        <RepositoryModal emptyState={true} />
      </div>
    </div>
  );
};

