import EnrolLtiLti2ToolProxyList from "@/components/enrolLtiLti2ToolProxys/EnrolLtiLti2ToolProxyList";
import NewEnrolLtiLti2ToolProxyModal from "@/components/enrolLtiLti2ToolProxys/EnrolLtiLti2ToolProxyModal";
import { api } from "@/lib/trpc/api";

export default async function EnrolLtiLti2ToolProxys() {
  const { enrolLtiLti2ToolProxys } = await api.enrolLtiLti2ToolProxys.getEnrolLtiLti2ToolProxys.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Enrol Lti Lti2 Tool Proxys</h1>
        <NewEnrolLtiLti2ToolProxyModal />
      </div>
      <EnrolLtiLti2ToolProxyList enrolLtiLti2ToolProxys={enrolLtiLti2ToolProxys} />
    </main>
  );
}
