"use client";
import { CompleteEnrolLtiToolConsumerMap } from "@soco/enrol-db/schema/enrolLtiToolConsumerMaps";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiToolConsumerMapModal from "./EnrolLtiToolConsumerMapModal";


export default function EnrolLtiToolConsumerMapList({ enrolLtiToolConsumerMaps }: { enrolLtiToolConsumerMaps: CompleteEnrolLtiToolConsumerMap[] }) {
  const { data: e } = trpc.enrolLtiToolConsumerMaps.getEnrolLtiToolConsumerMaps.useQuery(undefined, {
    initialData: { enrolLtiToolConsumerMaps },
    refetchOnMount: false,
  });

  if (e.enrolLtiToolConsumerMaps.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiToolConsumerMaps.map((enrolLtiToolConsumerMap) => (
        <EnrolLtiToolConsumerMap enrolLtiToolConsumerMap={enrolLtiToolConsumerMap} key={enrolLtiToolConsumerMap.id} />
      ))}
    </ul>
  );
}

const EnrolLtiToolConsumerMap = ({ enrolLtiToolConsumerMap }: { enrolLtiToolConsumerMap: CompleteEnrolLtiToolConsumerMap }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiToolConsumerMap.consumerId}</div>
      </div>
      <EnrolLtiToolConsumerMapModal enrolLtiToolConsumerMap={enrolLtiToolConsumerMap} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti tool consumer maps
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti tool consumer map.
      </p>
      <div className="mt-6">
        <EnrolLtiToolConsumerMapModal emptyState={true} />
      </div>
    </div>
  );
};

