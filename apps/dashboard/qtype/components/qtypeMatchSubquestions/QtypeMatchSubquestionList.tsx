"use client";
import { CompleteQtypeMatchSubquestion } from "@soco/qtype-db/schema/qtypeMatchSubquestions";
import { trpc } from "@/lib/trpc/client";
import QtypeMatchSubquestionModal from "./QtypeMatchSubquestionModal";


export default function QtypeMatchSubquestionList({ qtypeMatchSubquestions }: { qtypeMatchSubquestions: CompleteQtypeMatchSubquestion[] }) {
  const { data: q } = trpc.qtypeMatchSubquestions.getQtypeMatchSubquestions.useQuery(undefined, {
    initialData: { qtypeMatchSubquestions },
    refetchOnMount: false,
  });

  if (q.qtypeMatchSubquestions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.qtypeMatchSubquestions.map((qtypeMatchSubquestion) => (
        <QtypeMatchSubquestion qtypeMatchSubquestion={qtypeMatchSubquestion} key={qtypeMatchSubquestion.id} />
      ))}
    </ul>
  );
}

const QtypeMatchSubquestion = ({ qtypeMatchSubquestion }: { qtypeMatchSubquestion: CompleteQtypeMatchSubquestion }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{qtypeMatchSubquestion.answerText}</div>
      </div>
      <QtypeMatchSubquestionModal qtypeMatchSubquestion={qtypeMatchSubquestion} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No qtype match subquestions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new qtype match subquestion.
      </p>
      <div className="mt-6">
        <QtypeMatchSubquestionModal emptyState={true} />
      </div>
    </div>
  );
};

