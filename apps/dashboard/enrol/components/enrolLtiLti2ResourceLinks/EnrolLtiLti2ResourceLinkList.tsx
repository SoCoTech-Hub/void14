"use client";
import { CompleteEnrolLtiLti2ResourceLink } from "@/lib/db/schema/enrolLtiLti2ResourceLinks";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiLti2ResourceLinkModal from "./EnrolLtiLti2ResourceLinkModal";


export default function EnrolLtiLti2ResourceLinkList({ enrolLtiLti2ResourceLinks }: { enrolLtiLti2ResourceLinks: CompleteEnrolLtiLti2ResourceLink[] }) {
  const { data: e } = trpc.enrolLtiLti2ResourceLinks.getEnrolLtiLti2ResourceLinks.useQuery(undefined, {
    initialData: { enrolLtiLti2ResourceLinks },
    refetchOnMount: false,
  });

  if (e.enrolLtiLti2ResourceLinks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiLti2ResourceLinks.map((enrolLtiLti2ResourceLink) => (
        <EnrolLtiLti2ResourceLink enrolLtiLti2ResourceLink={enrolLtiLti2ResourceLink} key={enrolLtiLti2ResourceLink.id} />
      ))}
    </ul>
  );
}

const EnrolLtiLti2ResourceLink = ({ enrolLtiLti2ResourceLink }: { enrolLtiLti2ResourceLink: CompleteEnrolLtiLti2ResourceLink }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiLti2ResourceLink.consumerId}</div>
      </div>
      <EnrolLtiLti2ResourceLinkModal enrolLtiLti2ResourceLink={enrolLtiLti2ResourceLink} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti lti2 resource links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti lti2 resource link.
      </p>
      <div className="mt-6">
        <EnrolLtiLti2ResourceLinkModal emptyState={true} />
      </div>
    </div>
  );
};

