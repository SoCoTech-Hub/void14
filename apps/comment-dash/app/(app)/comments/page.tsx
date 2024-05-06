import CommentList from "@/components/comments/CommentList";
import NewCommentModal from "@/components/comments/CommentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Comments() {
  await checkAuth();
  const { comments } = await api.comments.getComments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Comments</h1>
        <NewCommentModal />
      </div>
      <CommentList comments={comments} />
    </main>
  );
}
