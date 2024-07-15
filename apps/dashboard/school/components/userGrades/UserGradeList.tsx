"use client";
import { CompleteUserGrade } from "@soco/school-db/schema/userGrades";
import { trpc } from "@/lib/trpc/client";
import UserGradeModal from "./UserGradeModal";


export default function UserGradeList({ userGrades }: { userGrades: CompleteUserGrade[] }) {
  const { data: u } = trpc.userGrades.getUserGrades.useQuery(undefined, {
    initialData: { userGrades },
    refetchOnMount: false,
  });

  if (u.userGrades.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userGrades.map((userGrade) => (
        <UserGrade userGrade={userGrade} key={userGrade.userGrade.id} />
      ))}
    </ul>
  );
}

const UserGrade = ({ userGrade }: { userGrade: CompleteUserGrade }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userGrade.userGrade.gradeId}</div>
      </div>
      <UserGradeModal userGrade={userGrade.userGrade} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user grades
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user grade.
      </p>
      <div className="mt-6">
        <UserGradeModal emptyState={true} />
      </div>
    </div>
  );
};

