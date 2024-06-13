import FeedbackItemList from "@/components/feedbackItems/FeedbackItemList";
import NewFeedbackItemModal from "@/components/feedbackItems/FeedbackItemModal";
import { api } from "@/lib/trpc/api";

export default async function FeedbackItems() {
  const { feedbackItems } = await api.feedbackItems.getFeedbackItems.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedback Items</h1>
        <NewFeedbackItemModal />
      </div>
      <FeedbackItemList feedbackItems={feedbackItems} />
    </main>
  );
}
