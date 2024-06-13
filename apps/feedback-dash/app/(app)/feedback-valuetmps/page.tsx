import FeedbackValuetmpList from "@/components/feedbackValuetmps/FeedbackValuetmpList";
import NewFeedbackValuetmpModal from "@/components/feedbackValuetmps/FeedbackValuetmpModal";
import { api } from "@/lib/trpc/api";

export default async function FeedbackValuetmps() {
  const { feedbackValuetmps } = await api.feedbackValuetmps.getFeedbackValuetmps.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feedback Valuetmps</h1>
        <NewFeedbackValuetmpModal />
      </div>
      <FeedbackValuetmpList feedbackValuetmps={feedbackValuetmps} />
    </main>
  );
}
