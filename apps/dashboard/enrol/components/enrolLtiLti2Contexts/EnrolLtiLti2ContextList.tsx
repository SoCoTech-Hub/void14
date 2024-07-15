"use client";
import { CompleteEnrolLtiLti2Context } from "@soco/enrol-db/schema/enrolLtiLti2Contexts";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2ContextModal from "./EnrolLtiLti2ContextModal";


export default function EnrolLtiLti2ContextList({ enrolLtiLti2Contexts }: { enrolLtiLti2Contexts: CompleteEnrolLtiLti2Context[] }) {
  const { data: e } = trpc.enrolLtiLti2Contexts.getEnrolLtiLti2Contexts.useQuery(undefined, {
    initialData: { enrolLtiLti2Contexts },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2Contexts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2Contexts.map((enrolLtiLti2Context) => (
        <EnrolLtiLti2Context enrolLtiLti2Context={enrolLtiLti2Context} key={enrolLtiLti2Context.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2Context = ({ enrolLtiLti2Context }: { enrolLtiLti2Context: CompleteEnrolLtiLti2Context }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2Context.consumerId}</div>
      </div>
      <EnrolLtiLti2ContextModal enrolLtiLti2Context={enrolLtiLti2Context} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 contexts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 context.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2ContextModal emptyState={true} />
      </div>
    </div>
  );
};

