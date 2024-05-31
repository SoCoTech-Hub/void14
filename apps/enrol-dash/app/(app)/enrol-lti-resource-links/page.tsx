import EnrolLtiResourceLinkList from "@/components/enrolLtiResourceLinks/EnrolLtiResourceLinkList";
import NewEnrolLtiResourceLinkModal from "@/components/enrolLtiResourceLinks/EnrolLtiResourceLinkModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiResourceLinks() {
  const { enrolLtiResourceLinks } = await api.enrolLtiResourceLinks.getEnrolLtiResourceLinks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Resource Links</h1>
        <NewEnrolLtiResourceLinkModal />
      </div>
      <EnrolLtiResourceLinkList enrolLtiResourceLinks={enrolLtiResourceLinks} />
    </main>
  );
}
