import H5pactivityAttemptsResultList from "@/components/h5pactivityAttemptsResults/H5pactivityAttemptsResultList";
import NewH5pactivityAttemptsResultModal from "@/components/h5pactivityAttemptsResults/H5pactivityAttemptsResultModal";
import { api } from "@/lib/trpc/api";

export default async function H5pactivityAttemptsResults() {
  const { h5pactivityAttemptsResults } = await api.h5pactivityAttemptsResults.getH5pactivityAttemptsResults.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">H5pactivity Attempts Results</h1>
        <NewH5pactivityAttemptsResultModal />
      </div>
      <H5pactivityAttemptsResultList h5pactivityAttemptsResults={h5pactivityAttemptsResults} />
    </main>
  );
}
