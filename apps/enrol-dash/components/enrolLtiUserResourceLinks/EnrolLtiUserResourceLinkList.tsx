"use client";
import { CompleteEnrolLtiUserResourceLink } from "@/lib/db/schema/enrolLtiUserResourceLinks";
import { trpc } from "@/lib/trpc/client";
import EnrolLtiUserResourceLinkModal from "./EnrolLtiUserResourceLinkModal";


export default function EnrolLtiUserResourceLinkList({ enrolLtiUserResourceLinks }: { enrolLtiUserResourceLinks: CompleteEnrolLtiUserResourceLink[] }) {
  const { data: e } = trpc.enrolLtiUserResourceLinks.getEnrolLtiUserResourceLinks.useQuery(undefined, {
    initialData: { enrolLtiUserResourceLinks },
    refetchOnMount: false,
  });

  if (e.enrolLtiUserResourceLinks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.enrolLtiUserResourceLinks.map((enrolLtiUserResourceLink) => (
        <EnrolLtiUserResourceLink enrolLtiUserResourceLink={enrolLtiUserResourceLink} key={enrolLtiUserResourceLink.enrolLtiUserResourceLink.id} />
      ))}
    </ul>
  );
}

const EnrolLtiUserResourceLink = ({ enrolLtiUserResourceLink }: { enrolLtiUserResourceLink: CompleteEnrolLtiUserResourceLink }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{enrolLtiUserResourceLink.enrolLtiUserResourceLink.enrolLtiUserId}</div>
      </div>
      <EnrolLtiUserResourceLinkModal enrolLtiUserResourceLink={enrolLtiUserResourceLink.enrolLtiUserResourceLink} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No enrol lti user resource links
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new enrol lti user resource link.
      </p>
      <div className="mt-6">
        <EnrolLtiUserResourceLinkModal emptyState={true} />
      </div>
    </div>
  );
};

