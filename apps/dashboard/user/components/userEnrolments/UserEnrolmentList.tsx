"use client";
import { CompleteUserEnrolment } from "@soco/user-db/schema/userEnrolments";
import { trpc } from "@/lib/trpc/client";
import UserEnrolmentModal from "./UserEnrolmentModal";


export default function UserEnrolmentList({ userEnrolments }: { userEnrolments: CompleteUserEnrolment[] }) {
  const { data: u } = trpc.userEnrolments.getUserEnrolments.useQuery(undefined, {
    initialData: { userEnrolments },
    refetchOnMount: false,
  });

  if (u.userEnrolments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userEnrolments.map((userEnrolment) => (
        <UserEnrolment userEnrolment={userEnrolment} key={userEnrolment.id} />
      ))}
    </ul>
  );
}

const UserEnrolment = ({ userEnrolment }: { userEnrolment: CompleteUserEnrolment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userEnrolment.enrolId}</div>
      </div>
      <UserEnrolmentModal userEnrolment={userEnrolment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user enrolments
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user enrolment.
      </p>
      <div className="mt-6">
        <UserEnrolmentModal emptyState={true} />
      </div>
    </div>
  );
};

