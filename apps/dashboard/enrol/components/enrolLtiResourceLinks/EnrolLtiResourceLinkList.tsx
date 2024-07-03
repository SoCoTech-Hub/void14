"use client";
import { CompleteEnrolLtiResourceLink } from "@/lib/db/schema/enrolLtiResourceLinks";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiResourceLinkModal from "./EnrolLtiResourceLinkModal";


export default function EnrolLtiResourceLinkList({ enrolLtiResourceLinks }: { enrolLtiResourceLinks: CompleteEnrolLtiResourceLink[] }) {
  const { data: e } = trpc.enrolLtiResourceLinks.getEnrolLtiResourceLinks.useQuery(undefined, {
    initialData: { enrolLtiResourceLinks },
    refetchOnMount: false,
  });

  if (e.enrolLtiResourceLinks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiResourceLinks.map((enrolLtiResourceLink) => (
        <EnrolLtiResourceLink enrolLtiResourceLink={enrolLtiResourceLink} key={enrolLtiResourceLink.id} />
      ))}
    </ul>
  );
}

const EnrolLtiResourceLink = ({ enrolLtiResourceLink }: { enrolLtiResourceLink: CompleteEnrolLtiResourceLink }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiResourceLink.contextMembershipsUrl}</div>
      </div>
      <EnrolLtiResourceLinkModal enrolLtiResourceLink={enrolLtiResourceLink} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti resource links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti resource link.
      </p>
      <div className="mt-6">
        <EnrolLtiResourceLinkModal emptyState={true} />
      </div>
    </div>
  );
};

