import LockDbList from "@/components/lockDbs/LockDbList";
import NewLockDbModal from "@/components/lockDbs/LockDbModal";
import { api } from "@/lib/trpc/api";

export default async function LockDbs() {
  const { lockDbs } = await api.lockDbs.getLockDbs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Lock Dbs</h1>
        <NewLockDbModal />
      </div>
      <LockDbList lockDbs={lockDbs} />
    </main>
  );
}
