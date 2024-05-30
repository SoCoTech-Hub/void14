import EnrolLtiLti2ContextList from "@/components/enrolLtiLti2Contexts/EnrolLtiLti2ContextList";
import NewEnrolLtiLti2ContextModal from "@/components/enrolLtiLti2Contexts/EnrolLtiLti2ContextModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2Contexts() {
  const { enrolLtiLti2Contexts } = await api.enrolLtiLti2Contexts.getEnrolLtiLti2Contexts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 Contexts</h1>
        <NewEnrolLtiLti2ContextModal />
      </div>
      <EnrolLtiLti2ContextList enrolLtiLti2Contexts={enrolLtiLti2Contexts} />
    </main>
  );
}
