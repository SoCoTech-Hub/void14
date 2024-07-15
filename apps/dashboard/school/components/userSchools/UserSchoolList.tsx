"use client";
import { CompleteUserSchool } from "@soco/school-db/schema/userSchools";
import { trpc } from "@/lib/trpc/client";
import UserSchoolModal from "./UserSchoolModal";


export default function UserSchoolList({ userSchools }: { userSchools: CompleteUserSchool[] }) {
  const { data: u } = trpc.userSchools.getUserSchools.useQuery(undefined, {
    initialData: { userSchools },
    refetchOnMount: false,
  });

  if (u.userSchools.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userSchools.map((userSchool) => (
        <UserSchool userSchool={userSchool} key={userSchool.userSchool.id} />
      ))}
    </ul>
  );
}

const UserSchool = ({ userSchool }: { userSchool: CompleteUserSchool }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userSchool.userSchool.schoolId}</div>
      </div>
      <UserSchoolModal userSchool={userSchool.userSchool} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user schools
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user school.
      </p>
      <div className="mt-6">
        <UserSchoolModal emptyState={true} />
      </div>
    </div>
  );
};

