import FeedbackValueList from "@/components/feedbackValues/FeedbackValueList";
import NewFeedbackValueModal from "@/components/feedbackValues/FeedbackValueModal";
import { api } from "@/lib/trpc/api";

export default async function FeedbackValues() {
  const { feedbackValues } = await api.feedbackValues.getFeedbackValues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedback Values</h1>
        <NewFeedbackValueModal />
      </div>
      <FeedbackValueList feedbackValues={feedbackValues} />
    </main>
  );
}
