"use client";
import { CompleteQuizaccessSebQuizSetting } from "@/lib/db/schema/quizaccessSebQuizSettings";
import { trpc } from "@/lib/trpc/client";
import QuizaccessSebQuizSettingModal from "./QuizaccessSebQuizSettingModal";


export default function QuizaccessSebQuizSettingList({ quizaccessSebQuizSettings }: { quizaccessSebQuizSettings: CompleteQuizaccessSebQuizSetting[] }) {
  const { data: q } = trpc.quizaccessSebQuizSettings.getQuizaccessSebQuizSettings.useQuery(undefined, {
    initialData: { quizaccessSebQuizSettings },
    refetchOnMount: false,
  });

  if (q.quizaccessSebQuizSettings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {q.quizaccessSebQuizSettings.map((quizaccessSebQuizSetting) => (
        <QuizaccessSebQuizSetting quizaccessSebQuizSetting={quizaccessSebQuizSetting} key={quizaccessSebQuizSetting.quizaccessSebQuizSetting.id} />
      ))}
    </ul>
  );
}

const QuizaccessSebQuizSetting = ({ quizaccessSebQuizSetting }: { quizaccessSebQuizSetting: CompleteQuizaccessSebQuizSetting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{quizaccessSebQuizSetting.quizaccessSebQuizSetting.activateUrlFiltering}</div>
      </div>
      <QuizaccessSebQuizSettingModal quizaccessSebQuizSetting={quizaccessSebQuizSetting.quizaccessSebQuizSetting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No quizaccess seb quiz settings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new quizaccess seb quiz setting.
      </p>
      <div className="mt-6">
        <QuizaccessSebQuizSettingModal emptyState={true} />
      </div>
    </div>
  );
};

