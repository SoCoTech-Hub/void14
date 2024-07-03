import EnrolLtiLti2ConsumerList from "@/components/enrolLtiLti2Consumers/EnrolLtiLti2ConsumerList";
import NewEnrolLtiLti2ConsumerModal from "@/components/enrolLtiLti2Consumers/EnrolLtiLti2ConsumerModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2Consumers() {
  const { enrolLtiLti2Consumers } = await api.enrolLtiLti2Consumers.getEnrolLtiLti2Consumers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 Consumers</h1>
        <NewEnrolLtiLti2ConsumerModal />
      </div>
      <EnrolLtiLti2ConsumerList enrolLtiLti2Consumers={enrolLtiLti2Consumers} />
    </main>
  );
}
