import FeedbackTemplateList from "@/components/feedbackTemplates/FeedbackTemplateList";
import NewFeedbackTemplateModal from "@/components/feedbackTemplates/FeedbackTemplateModal";
import { api } from "@/lib/trpc/api";

export default async function FeedbackTemplates() {
  const { feedbackTemplates } = await api.feedbackTemplates.getFeedbackTemplates.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedback Templates</h1>
        <NewFeedbackTemplateModal />
      </div>
      <FeedbackTemplateList feedbackTemplates={feedbackTemplates} />
    </main>
  );
}
