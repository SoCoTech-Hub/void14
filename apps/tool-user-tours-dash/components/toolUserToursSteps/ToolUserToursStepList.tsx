"use client";
import { CompleteToolUserToursStep } from "@/lib/db/schema/toolUserToursSteps";
import { trpc } from "@/lib/trpc/client";
import ToolUserToursStepModal from "./ToolUserToursStepModal";


export default function ToolUserToursStepList({ toolUserToursSteps }: { toolUserToursSteps: CompleteToolUserToursStep[] }) {
  const { data: t } = trpc.toolUserToursSteps.getToolUserToursSteps.useQuery(undefined, {
    initialData: { toolUserToursSteps },
    refetchOnMount: false,
  });

  if (t.toolUserToursSteps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.toolUserToursSteps.map((toolUserToursStep) => (
        <ToolUserToursStep toolUserToursStep={toolUserToursStep} key={toolUserToursStep.id} />
      ))}
    </ul>
  );
}

const ToolUserToursStep = ({ toolUserToursStep }: { toolUserToursStep: CompleteToolUserToursStep }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{toolUserToursStep.configData}</div>
      </div>
      <ToolUserToursStepModal toolUserToursStep={toolUserToursStep} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tool user tours steps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tool user tours step.
      </p>
      <div className="mt-6">
        <ToolUserToursStepModal emptyState={true} />
      </div>
    </div>
  );
};

