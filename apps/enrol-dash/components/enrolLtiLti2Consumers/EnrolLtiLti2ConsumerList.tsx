"use client";
import { CompleteEnrolLtiLti2Consumer } from "@/lib/db/schema/enrolLtiLti2Consumers";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2ConsumerModal from "./EnrolLtiLti2ConsumerModal";


export default function EnrolLtiLti2ConsumerList({ enrolLtiLti2Consumers }: { enrolLtiLti2Consumers: CompleteEnrolLtiLti2Consumer[] }) {
  const { data: e } = trpc.enrolLtiLti2Consumers.getEnrolLtiLti2Consumers.useQuery(undefined, {
    initialData: { enrolLtiLti2Consumers },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2Consumers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2Consumers.map((enrolLtiLti2Consumer) => (
        <EnrolLtiLti2Consumer enrolLtiLti2Consumer={enrolLtiLti2Consumer} key={enrolLtiLti2Consumer.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2Consumer = ({ enrolLtiLti2Consumer }: { enrolLtiLti2Consumer: CompleteEnrolLtiLti2Consumer }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2Consumer.consumerGuid}</div>
      </div>
      <EnrolLtiLti2ConsumerModal enrolLtiLti2Consumer={enrolLtiLti2Consumer} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 consumers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 consumer.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2ConsumerModal emptyState={true} />
      </div>
    </div>
  );
};

