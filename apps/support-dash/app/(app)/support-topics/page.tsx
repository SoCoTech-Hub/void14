import SupportTopicList from "@/components/supportTopics/SupportTopicList";
import NewSupportTopicModal from "@/components/supportTopics/SupportTopicModal";
import { api } from "@/lib/trpc/api";

export default async function SupportTopics() {
  const { supportTopics } = await api.supportTopics.getSupportTopics.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Support Topics</h1>
        <NewSupportTopicModal />
      </div>
      <SupportTopicList supportTopics={supportTopics} />
    </main>
  );
}
