import LtiTypeList from "@/components/ltiTypes/LtiTypeList";
import NewLtiTypeModal from "@/components/ltiTypes/LtiTypeModal";
import { api } from "@/lib/trpc/api";

export default async function LtiTypes() {
  const { ltiTypes } = await api.ltiTypes.getLtiTypes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lti Types</h1>
        <NewLtiTypeModal />
      </div>
      <LtiTypeList ltiTypes={ltiTypes} />
    </main>
  );
}
