import EnrolLtiLti2NonceList from "@/components/enrolLtiLti2Nonces/EnrolLtiLti2NonceList";
import NewEnrolLtiLti2NonceModal from "@/components/enrolLtiLti2Nonces/EnrolLtiLti2NonceModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2Nonces() {
  const { enrolLtiLti2Nonces } = await api.enrolLtiLti2Nonces.getEnrolLtiLti2Nonces.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 Nonces</h1>
        <NewEnrolLtiLti2NonceModal />
      </div>
      <EnrolLtiLti2NonceList enrolLtiLti2Nonces={enrolLtiLti2Nonces} />
    </main>
  );
}
