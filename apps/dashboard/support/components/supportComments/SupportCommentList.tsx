"use client";
import { CompleteSupportComment } from "@/lib/db/schema/supportComments";
import { trpc } from "@/lib/trpc/client";
import SupportCommentModal from "./SupportCommentModal";


export default function SupportCommentList({ supportComments }: { supportComments: CompleteSupportComment[] }) {
  const { data: s } = trpc.supportComments.getSupportComments.useQuery(undefined, {
    initialData: { supportComments },
    refetchOnMount: false,
  });

  if (s.supportComments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.supportComments.map((supportComment) => (
        <SupportComment supportComment={supportComment} key={supportComment.id} />
      ))}
    </ul>
  );
}

const SupportComment = ({ supportComment }: { supportComment: CompleteSupportComment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{supportComment.comment}</div>
      </div>
      <SupportCommentModal supportComment={supportComment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No support comments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new support comment.
      </p>
      <div className="mt-6">
        <SupportCommentModal emptyState={true} />
      </div>
    </div>
  );
};

