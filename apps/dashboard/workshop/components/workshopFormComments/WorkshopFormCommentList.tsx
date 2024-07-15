"use client";
import { CompleteWorkshopFormComment } from "@soco/workshop-db/schema/workshopFormComments";
import { trpc } from "@/lib/trpc/client";
import WorkshopFormCommentModal from "./WorkshopFormCommentModal";


export default function WorkshopFormCommentList({ workshopFormComments }: { workshopFormComments: CompleteWorkshopFormComment[] }) {
  const { data: w } = trpc.workshopFormComments.getWorkshopFormComments.useQuery(undefined, {
    initialData: { workshopFormComments },
    refetchOnMount: false,
  });

  if (w.workshopFormComments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {w.workshopFormComments.map((workshopFormComment) => (
        <WorkshopFormComment workshopFormComment={workshopFormComment} key={workshopFormComment.workshopFormComment.id} />
      ))}
    </ul>
  );
}

const WorkshopFormComment = ({ workshopFormComment }: { workshopFormComment: CompleteWorkshopFormComment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{workshopFormComment.workshopFormComment.description}</div>
      </div>
      <WorkshopFormCommentModal workshopFormComment={workshopFormComment.workshopFormComment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workshop form comments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new workshop form comment.
      </p>
      <div className="mt-6">
        <WorkshopFormCommentModal emptyState={true} />
      </div>
    </div>
  );
};

