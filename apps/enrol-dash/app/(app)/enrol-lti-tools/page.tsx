import EnrolLtiToolList from "@/components/enrolLtiTools/EnrolLtiToolList";
import NewEnrolLtiToolModal from "@/components/enrolLtiTools/EnrolLtiToolModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiTools() {
  const { enrolLtiTools } = await api.enrolLtiTools.getEnrolLtiTools.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Tools</h1>
        <NewEnrolLtiToolModal />
      </div>
      <EnrolLtiToolList enrolLtiTools={enrolLtiTools} />
    </main>
  );
}
