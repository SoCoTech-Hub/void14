"use client";
import { CompleteResource } from "@/lib/db/schema/resources";
import { trpc } from "@/lib/trpc/client";
import ResourceModal from "./ResourceModal";


export default function ResourceList({ resources }: { resources: CompleteResource[] }) {
  const { data: r } = trpc.resources.getResources.useQuery(undefined, {
    initialData: { resources },
    refetchOnMount: false,
  });

  if (r.resources.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {r.resources.map((resource) => (
        <Resource resource={resource} key={resource.id} />
      ))}
    </ul>
  );
}

const Resource = ({ resource }: { resource: CompleteResource }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{resource.courseId}</div>
      </div>
      <ResourceModal resource={resource} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No resources
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new resource.
      </p>
      <div className="mt-6">
        <ResourceModal emptyState={true} />
      </div>
    </div>
  );
};

