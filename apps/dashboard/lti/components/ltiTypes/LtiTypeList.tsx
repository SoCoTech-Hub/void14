"use client";
import { CompleteLtiType } from "@soco/lti-db/schema/ltiTypes";
import { trpc } from "@/lib/trpc/client";
import LtiTypeModal from "./LtiTypeModal";


export default function LtiTypeList({ ltiTypes }: { ltiTypes: CompleteLtiType[] }) {
  const { data: l } = trpc.ltiTypes.getLtiTypes.useQuery(undefined, {
    initialData: { ltiTypes },
    refetchOnMount: false,
  });

  if (l.ltiTypes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltiTypes.map((ltiType) => (
        <LtiType ltiType={ltiType} key={ltiType.id} />
      ))}
    </ul>
  );
}

const LtiType = ({ ltiType }: { ltiType: CompleteLtiType }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{ltiType.baseUrl}</div>
      </div>
      <LtiTypeModal ltiType={ltiType} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No lti types
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti type.
      </p>
      <div className="mt-6">
        <LtiTypeModal emptyState={true} />
      </div>
    </div>
  );
};

