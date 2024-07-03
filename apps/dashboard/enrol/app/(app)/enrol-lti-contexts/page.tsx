import EnrolLtiContextList from "@/components/enrolLtiContexts/EnrolLtiContextList";
import NewEnrolLtiContextModal from "@/components/enrolLtiContexts/EnrolLtiContextModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiContexts() {
  const { enrolLtiContexts } = await api.enrolLtiContexts.getEnrolLtiContexts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Contexts</h1>
        <NewEnrolLtiContextModal />
      </div>
      <EnrolLtiContextList enrolLtiContexts={enrolLtiContexts} />
    </main>
  );
}
