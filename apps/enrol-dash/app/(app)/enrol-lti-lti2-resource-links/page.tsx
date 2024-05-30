import EnrolLtiLti2ResourceLinkList from "@/components/enrolLtiLti2ResourceLinks/EnrolLtiLti2ResourceLinkList";
import NewEnrolLtiLti2ResourceLinkModal from "@/components/enrolLtiLti2ResourceLinks/EnrolLtiLti2ResourceLinkModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2ResourceLinks() {
  const { enrolLtiLti2ResourceLinks } = await api.enrolLtiLti2ResourceLinks.getEnrolLtiLti2ResourceLinks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 Resource Links</h1>
        <NewEnrolLtiLti2ResourceLinkModal />
      </div>
      <EnrolLtiLti2ResourceLinkList enrolLtiLti2ResourceLinks={enrolLtiLti2ResourceLinks} />
    </main>
  );
}
