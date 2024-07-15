import Oauth2EndpointList from "@/components/oauth2Endpoints/Oauth2EndpointList";
import NewOauth2EndpointModal from "@/components/oauth2Endpoints/Oauth2EndpointModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Oauth2Endpoints() {
  await checkAuth();
  const { oauth2Endpoints } = await api.oauth2Endpoints.getOauth2Endpoints.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Oauth2 Endpoints</h1>
        <NewOauth2EndpointModal />
      </div>
      <Oauth2EndpointList oauth2Endpoints={oauth2Endpoints} />
    </main>
  );
}
