import MyPageList from "@/components/myPages/MyPageList";
import NewMyPageModal from "@/components/myPages/MyPageModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function MyPages() {
  await checkAuth();
  const { myPages } = await api.myPages.getMyPages.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">My Pages</h1>
        <NewMyPageModal />
      </div>
      <MyPageList myPages={myPages} />
    </main>
  );
}
