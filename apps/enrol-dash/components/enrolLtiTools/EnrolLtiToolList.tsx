"use client";
import { CompleteEnrolLtiTool } from "@/lib/db/schema/enrolLtiTools";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiToolModal from "./EnrolLtiToolModal";


export default function EnrolLtiToolList({ enrolLtiTools }: { enrolLtiTools: CompleteEnrolLtiTool[] }) {
  const { data: e } = trpc.enrolLtiTools.getEnrolLtiTools.useQuery(undefined, {
    initialData: { enrolLtiTools },
    refetchOnMount: false,
  });

  if (e.enrolLtiTools.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiTools.map((enrolLtiTool) => (
        <EnrolLtiTool enrolLtiTool={enrolLtiTool} key={enrolLtiTool.id} />
      ))}
    </ul>
  );
}

const EnrolLtiTool = ({ enrolLtiTool }: { enrolLtiTool: CompleteEnrolLtiTool }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiTool.city}</div>
      </div>
      <EnrolLtiToolModal enrolLtiTool={enrolLtiTool} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti tools
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti tool.
      </p>
      <div className="mt-6">
        <EnrolLtiToolModal emptyState={true} />
      </div>
    </div>
  );
};

