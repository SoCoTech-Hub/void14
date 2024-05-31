"use client";
import { CompleteUserInfoData } from "@/lib/db/schema/userInfoDatas";
import { trpc } from "@/lib/trpc/client";
import UserInfoDataModal from "./UserInfoDataModal";


export default function UserInfoDataList({ userInfoDatas }: { userInfoDatas: CompleteUserInfoData[] }) {
  const { data: u } = trpc.userInfoDatas.getUserInfoDatas.useQuery(undefined, {
    initialData: { userInfoDatas },
    refetchOnMount: false,
  });

  if (u.userInfoDatas.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.userInfoDatas.map((userInfoData) => (
        <UserInfoData userInfoData={userInfoData} key={userInfoData.id} />
      ))}
    </ul>
  );
}

const UserInfoData = ({ userInfoData }: { userInfoData: CompleteUserInfoData }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{userInfoData.fieldId}</div>
      </div>
      <UserInfoDataModal userInfoData={userInfoData} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No user info datas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user info data.
      </p>
      <div className="mt-6">
        <UserInfoDataModal emptyState={true} />
      </div>
    </div>
  );
};

