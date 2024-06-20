"use client";
import { CompleteOauth2UserFieldMapping } from "@/lib/db/schema/oauth2UserFieldMappings";
import { trpc } from "@/lib/trpc/client";
import Oauth2UserFieldMappingModal from "./Oauth2UserFieldMappingModal";


export default function Oauth2UserFieldMappingList({ oauth2UserFieldMappings }: { oauth2UserFieldMappings: CompleteOauth2UserFieldMapping[] }) {
  const { data: o } = trpc.oauth2UserFieldMappings.getOauth2UserFieldMappings.useQuery(undefined, {
    initialData: { oauth2UserFieldMappings },
    refetchOnMount: false,
  });

  if (o.oauth2UserFieldMappings.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {o.oauth2UserFieldMappings.map((oauth2UserFieldMapping) => (
        <Oauth2UserFieldMapping oauth2UserFieldMapping={oauth2UserFieldMapping} key={oauth2UserFieldMapping.oauth2UserFieldMapping.id} />
      ))}
    </ul>
  );
}

const Oauth2UserFieldMapping = ({ oauth2UserFieldMapping }: { oauth2UserFieldMapping: CompleteOauth2UserFieldMapping }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{oauth2UserFieldMapping.oauth2UserFieldMapping.externalField}</div>
      </div>
      <Oauth2UserFieldMappingModal oauth2UserFieldMapping={oauth2UserFieldMapping.oauth2UserFieldMapping} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No oauth2 user field mappings
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new oauth2 user field mapping.
      </p>
      <div className="mt-6">
        <Oauth2UserFieldMappingModal emptyState={true} />
      </div>
    </div>
  );
};

