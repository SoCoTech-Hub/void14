import EnrolLtiAppRegistrationList from "@/components/enrolLtiAppRegistrations/EnrolLtiAppRegistrationList";
import NewEnrolLtiAppRegistrationModal from "@/components/enrolLtiAppRegistrations/EnrolLtiAppRegistrationModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiAppRegistrations() {
  const { enrolLtiAppRegistrations } = await api.enrolLtiAppRegistrations.getEnrolLtiAppRegistrations.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti App Registrations</h1>
        <NewEnrolLtiAppRegistrationModal />
      </div>
      <EnrolLtiAppRegistrationList enrolLtiAppRegistrations={enrolLtiAppRegistrations} />
    </main>
  );
}
