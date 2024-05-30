"use client";
import { CompleteEnrolLtiContext } from "@/lib/db/schema/enrolLtiContexts";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiContextModal from "./EnrolLtiContextModal";


export default function EnrolLtiContextList({ enrolLtiContexts }: { enrolLtiContexts: CompleteEnrolLtiContext[] }) {
  const { data: e } = trpc.enrolLtiContexts.getEnrolLtiContexts.useQuery(undefined, {
    initialData: { enrolLtiContexts },
    refetchOnMount: false,
  });

  if (e.enrolLtiContexts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiContexts.map((enrolLtiContext) => (
        <EnrolLtiContext enrolLtiContext={enrolLtiContext} key={enrolLtiContext.id} />
      ))}
    </ul>
  );
}

const EnrolLtiContext = ({ enrolLtiContext }: { enrolLtiContext: CompleteEnrolLtiContext }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiContext.contextId}</div>
      </div>
      <EnrolLtiContextModal enrolLtiContext={enrolLtiContext} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti contexts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti context.
      </p>
      <div className="mt-6">
        <EnrolLtiContextModal emptyState={true} />
      </div>
    </div>
  );
};

