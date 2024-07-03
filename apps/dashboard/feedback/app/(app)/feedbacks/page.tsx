import FeedbackList from "@/components/feedbacks/FeedbackList";
import NewFeedbackModal from "@/components/feedbacks/FeedbackModal";
import { api } from "@/lib/trpc/api";

export default async function Feedbacks() {
  const { feedbacks } = await api.feedbacks.getFeedbacks.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedbacks</h1>
        <NewFeedbackModal />
      </div>
      <FeedbackList feedbacks={feedbacks} />
    </main>
  );
}
