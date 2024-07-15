"use client";
import { CompleteUserInfoCategory } from "@soco/user-db/schema/userInfoCategories";
import { trpc } from "@/lib/trpc/client";
import UserInfoCategoryModal from "./UserInfoCategoryModal";


export default function UserInfoCategoryList({ userInfoCategories }: { userInfoCategories: CompleteUserInfoCategory[] }) {
  const { data: u } = trpc.userInfoCategories.getUserInfoCategories.useQuery(undefined, {
    initialData: { userInfoCategories },
    refetchOnMount: false,
  });

  if (u.userInfoCategories.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userInfoCategories.map((userInfoCategory) => (
        <UserInfoCategory userInfoCategory={userInfoCategory} key={userInfoCategory.id} />
      ))}
    </ul>
  );
}

const UserInfoCategory = ({ userInfoCategory }: { userInfoCategory: CompleteUserInfoCategory }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userInfoCategory.name}</div>
      </div>
      <UserInfoCategoryModal userInfoCategory={userInfoCategory} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user info categories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user info category.
      </p>
      <div className="mt-6">
        <UserInfoCategoryModal emptyState={true} />
      </div>
    </div>
  );
};

