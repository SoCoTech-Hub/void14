"use client";
import { CompleteMyPage } from "@/lib/db/schema/myPages";
import { trpc } from "@/lib/trpc/client";
import MyPageModal from "./MyPageModal";


export default function MyPageList({ myPages }: { myPages: CompleteMyPage[] }) {
  const { data: m } = trpc.myPages.getMyPages.useQuery(undefined, {
    initialData: { myPages },
    refetchOnMount: false,
  });

  if (m.myPages.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.myPages.map((myPage) => (
        <MyPage myPage={myPage} key={myPage.id} />
      ))}
    </ul>
  );
}

const MyPage = ({ myPage }: { myPage: CompleteMyPage }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{myPage.name}</div>
      </div>
      <MyPageModal myPage={myPage} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No my pages
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new my page.
      </p>
      <div className="mt-6">
        <MyPageModal emptyState={true} />
      </div>
    </div>
  );
};

