import MnetSsoAccessControlList from "@/components/mnetSsoAccessControls/MnetSsoAccessControlList";
import NewMnetSsoAccessControlModal from "@/components/mnetSsoAccessControls/MnetSsoAccessControlModal";
import { api } from "@/lib/trpc/api";

export default async function MnetSsoAccessControls() {
  const { mnetSsoAccessControls } = await api.mnetSsoAccessControls.getMnetSsoAccessControls.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Mnet Sso Access Controls</h1>
        <NewMnetSsoAccessControlModal />
      </div>
      <MnetSsoAccessControlList mnetSsoAccessControls={mnetSsoAccessControls} />
    </main>
  );
}
