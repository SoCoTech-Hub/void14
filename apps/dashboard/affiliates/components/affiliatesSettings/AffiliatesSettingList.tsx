"use client";
import { CompleteAffiliatesSetting } from "@soco/affiliates-db/schema/affiliatesSettings";
import { trpc } from "@/lib/trpc/client";
import AffiliatesSettingModal from "./AffiliatesSettingModal";


export default function AffiliatesSettingList({ affiliatesSettings }: { affiliatesSettings: CompleteAffiliatesSetting[] }) {
  const { data: a } = trpc.affiliatesSettings.getAffiliatesSettings.useQuery(undefined, {
    initialData: { affiliatesSettings },
    refetchOnMount: false,
  });

  if (a.affiliatesSettings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.affiliatesSettings.map((affiliatesSetting) => (
        <AffiliatesSetting affiliatesSetting={affiliatesSetting} key={affiliatesSetting.id} />
      ))}
    </ul>
  );
}

const AffiliatesSetting = ({ affiliatesSetting }: { affiliatesSetting: CompleteAffiliatesSetting }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{affiliatesSetting.rate}</div>
      </div>
      <AffiliatesSettingModal affiliatesSetting={affiliatesSetting} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No affiliates settings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new affiliates setting.
      </p>
      <div className="mt-6">
        <AffiliatesSettingModal emptyState={true} />
      </div>
    </div>
  );
};

