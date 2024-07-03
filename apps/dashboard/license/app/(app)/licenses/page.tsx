import LicenseList from "@/components/licenses/LicenseList";
import NewLicenseModal from "@/components/licenses/LicenseModal";
import { api } from "@/lib/trpc/api";

export default async function Licenses() {
  const { licenses } = await api.licenses.getLicenses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Licenses</h1>
        <NewLicenseModal />
      </div>
      <LicenseList licenses={licenses} />
    </main>
  );
}
