"use client";
import { CompleteGradingformGuideFilling } from "@soco/grade-db/schema/gradingformGuideFillings";
import { trpc } from "@/lib/trpc/client";
import GradingformGuideFillingModal from "./GradingformGuideFillingModal";


export default function GradingformGuideFillingList({ gradingformGuideFillings }: { gradingformGuideFillings: CompleteGradingformGuideFilling[] }) {
  const { data: g } = trpc.gradingformGuideFillings.getGradingformGuideFillings.useQuery(undefined, {
    initialData: { gradingformGuideFillings },
    refetchOnMount: false,
  });

  if (g.gradingformGuideFillings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {g.gradingformGuideFillings.map((gradingformGuideFilling) => (
        <GradingformGuideFilling gradingformGuideFilling={gradingformGuideFilling} key={gradingformGuideFilling.id} />
      ))}
    </ul>
  );
}

const GradingformGuideFilling = ({ gradingformGuideFilling }: { gradingformGuideFilling: CompleteGradingformGuideFilling }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{gradingformGuideFilling.criterionId}</div>
      </div>
      <GradingformGuideFillingModal gradingformGuideFilling={gradingformGuideFilling} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No gradingform guide fillings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new gradingform guide filling.
      </p>
      <div className="mt-6">
        <GradingformGuideFillingModal emptyState={true} />
      </div>
    </div>
  );
};

