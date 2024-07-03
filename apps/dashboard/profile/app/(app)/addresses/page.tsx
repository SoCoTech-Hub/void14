import AddressList from "@/components/addresses/AddressList";
import NewAddressModal from "@/components/addresses/AddressModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Addresses() {
  await checkAuth();
  const { addresses } = await api.addresses.getAddresses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Addresses</h1>
        <NewAddressModal />
      </div>
      <AddressList addresses={addresses} />
    </main>
  );
}
