import H5pactivityAttemptList from "@/components/h5pactivityAttempts/H5pactivityAttemptList";
import NewH5pactivityAttemptModal from "@/components/h5pactivityAttempts/H5pactivityAttemptModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function H5pactivityAttempts() {
  await checkAuth();
  const { h5pactivityAttempts } = await api.h5pactivityAttempts.getH5pactivityAttempts.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5pactivity Attempts</h1>
        <NewH5pactivityAttemptModal />
      </div>
      <H5pactivityAttemptList h5pactivityAttempts={h5pactivityAttempts} />
    </main>
  );
}
