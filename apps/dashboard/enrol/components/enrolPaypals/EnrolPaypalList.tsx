"use client";
import { CompleteEnrolPaypal } from "@soco/enrol-db/schema/enrolPaypals";
import { trpc } from "@/lib/trpc/client";
import EnrolPaypalModal from "./EnrolPaypalModal";


export default function EnrolPaypalList({ enrolPaypals }: { enrolPaypals: CompleteEnrolPaypal[] }) {
  const { data: e } = trpc.enrolPaypals.getEnrolPaypals.useQuery(undefined, {
    initialData: { enrolPaypals },
    refetchOnMount: false,
  });

  if (e.enrolPaypals.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolPaypals.map((enrolPaypal) => (
        <EnrolPaypal enrolPaypal={enrolPaypal} key={enrolPaypal.id} />
      ))}
    </ul>
  );
}

const EnrolPaypal = ({ enrolPaypal }: { enrolPaypal: CompleteEnrolPaypal }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolPaypal.business}</div>
      </div>
      <EnrolPaypalModal enrolPaypal={enrolPaypal} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol paypals
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol paypal.
      </p>
      <div className="mt-6">
        <EnrolPaypalModal emptyState={true} />
      </div>
    </div>
  );
};

