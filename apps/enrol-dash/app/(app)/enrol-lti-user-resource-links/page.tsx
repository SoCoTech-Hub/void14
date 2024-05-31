import EnrolLtiUserResourceLinkList from "@/components/enrolLtiUserResourceLinks/EnrolLtiUserResourceLinkList";
import NewEnrolLtiUserResourceLinkModal from "@/components/enrolLtiUserResourceLinks/EnrolLtiUserResourceLinkModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiUserResourceLinks() {
  const { enrolLtiUserResourceLinks } = await api.enrolLtiUserResourceLinks.getEnrolLtiUserResourceLinks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti User Resource Links</h1>
        <NewEnrolLtiUserResourceLinkModal />
      </div>
      <EnrolLtiUserResourceLinkList enrolLtiUserResourceLinks={enrolLtiUserResourceLinks} />
    </main>
  );
}
