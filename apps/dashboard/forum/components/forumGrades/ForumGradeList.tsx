"use client";
import { CompleteForumGrade } from "@soco/forum-db/schema/forumGrades";
import { trpc } from "@/lib/trpc/client";
import ForumGradeModal from "./ForumGradeModal";


export default function ForumGradeList({ forumGrades }: { forumGrades: CompleteForumGrade[] }) {
  const { data: f } = trpc.forumGrades.getForumGrades.useQuery(undefined, {
    initialData: { forumGrades },
    refetchOnMount: false,
  });

  if (f.forumGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.forumGrades.map((forumGrade) => (
        <ForumGrade forumGrade={forumGrade} key={forumGrade.id} />
      ))}
    </ul>
  );
}

const ForumGrade = ({ forumGrade }: { forumGrade: CompleteForumGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{forumGrade.forum}</div>
      </div>
      <ForumGradeModal forumGrade={forumGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No forum grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new forum grade.
      </p>
      <div className="mt-6">
        <ForumGradeModal emptyState={true} />
      </div>
    </div>
  );
};

