"use client";
import { CompleteAddress } from "@soco/profile-db/schema/addresses";
import { trpc } from "@/lib/trpc/client";
import AddressModal from "./AddressModal";


export default function AddressList({ addresses }: { addresses: CompleteAddress[] }) {
  const { data: a } = trpc.addresses.getAddresses.useQuery(undefined, {
    initialData: { addresses },
    refetchOnMount: false,
  });

  if (a.addresses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.addresses.map((address) => (
        <Address address={address} key={address.id} />
      ))}
    </ul>
  );
}

const Address = ({ address }: { address: CompleteAddress }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{address.line1}</div>
      </div>
      <AddressModal address={address} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No addresses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new address.
      </p>
      <div className="mt-6">
        <AddressModal emptyState={true} />
      </div>
    </div>
  );
};

