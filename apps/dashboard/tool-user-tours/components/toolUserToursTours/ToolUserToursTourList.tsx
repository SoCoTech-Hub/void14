"use client";
import { CompleteToolUserToursTour } from "@soco/tool-user-tours-db/schema/toolUserToursTours";
import { trpc } from "@/lib/trpc/client";
import ToolUserToursTourModal from "./ToolUserToursTourModal";


export default function ToolUserToursTourList({ toolUserToursTours }: { toolUserToursTours: CompleteToolUserToursTour[] }) {
  const { data: t } = trpc.toolUserToursTours.getToolUserToursTours.useQuery(undefined, {
    initialData: { toolUserToursTours },
    refetchOnMount: false,
  });

  if (t.toolUserToursTours.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolUserToursTours.map((toolUserToursTour) => (
        <ToolUserToursTour toolUserToursTour={toolUserToursTour} key={toolUserToursTour.id} />
      ))}
    </ul>
  );
}

const ToolUserToursTour = ({ toolUserToursTour }: { toolUserToursTour: CompleteToolUserToursTour }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolUserToursTour.configData}</div>
      </div>
      <ToolUserToursTourModal toolUserToursTour={toolUserToursTour} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool user tours tours
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool user tours tour.
      </p>
      <div className="mt-6">
        <ToolUserToursTourModal emptyState={true} />
      </div>
    </div>
  );
};

