"use client";
import { CompleteLti } from "@/lib/db/schema/ltis";
import { trpc } from "@/lib/trpc/client";
import LtiModal from "./LtiModal";


export default function LtiList({ ltis }: { ltis: CompleteLti[] }) {
  const { data: l } = trpc.ltis.getLtis.useQuery(undefined, {
    initialData: { ltis },
    refetchOnMount: false,
  });

  if (l.ltis.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {l.ltis.map((lti) => (
        <Lti lti={lti} key={lti.id} />
      ))}
    </ul>
  );
}

const Lti = ({ lti }: { lti: CompleteLti }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{lti.course}</div>
      </div>
      <LtiModal lti={lti} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No ltis
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new lti.
      </p>
      <div className="mt-6">
        <LtiModal emptyState={true} />
      </div>
    </div>
  );
};

