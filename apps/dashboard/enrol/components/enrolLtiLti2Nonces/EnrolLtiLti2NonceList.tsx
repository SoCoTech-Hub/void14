"use client";
import { CompleteEnrolLtiLti2Nonce } from "@soco/enrol-db/schema/enrolLtiLti2Nonces";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2NonceModal from "./EnrolLtiLti2NonceModal";


export default function EnrolLtiLti2NonceList({ enrolLtiLti2Nonces }: { enrolLtiLti2Nonces: CompleteEnrolLtiLti2Nonce[] }) {
  const { data: e } = trpc.enrolLtiLti2Nonces.getEnrolLtiLti2Nonces.useQuery(undefined, {
    initialData: { enrolLtiLti2Nonces },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2Nonces.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2Nonces.map((enrolLtiLti2Nonce) => (
        <EnrolLtiLti2Nonce enrolLtiLti2Nonce={enrolLtiLti2Nonce} key={enrolLtiLti2Nonce.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2Nonce = ({ enrolLtiLti2Nonce }: { enrolLtiLti2Nonce: CompleteEnrolLtiLti2Nonce }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2Nonce.consumerId}</div>
      </div>
      <EnrolLtiLti2NonceModal enrolLtiLti2Nonce={enrolLtiLti2Nonce} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 nonces
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 nonce.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2NonceModal emptyState={true} />
      </div>
    </div>
  );
};

