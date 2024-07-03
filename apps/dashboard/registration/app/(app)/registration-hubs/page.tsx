import RegistrationHubList from "@/components/registrationHubs/RegistrationHubList";
import NewRegistrationHubModal from "@/components/registrationHubs/RegistrationHubModal";
import { api } from "@/lib/trpc/api";

export default async function RegistrationHubs() {
  const { registrationHubs } = await api.registrationHubs.getRegistrationHubs.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Registration Hubs</h1>
        <NewRegistrationHubModal />
      </div>
      <RegistrationHubList registrationHubs={registrationHubs} />
    </main>
  );
}
