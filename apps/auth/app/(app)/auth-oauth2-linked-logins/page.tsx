import AuthOauth2LinkedLoginList from "@/components/authOauth2LinkedLogins/AuthOauth2LinkedLoginList";
import NewAuthOauth2LinkedLoginModal from "@/components/authOauth2LinkedLogins/AuthOauth2LinkedLoginModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AuthOauth2LinkedLogins() {
  await checkAuth();
  const { authOauth2LinkedLogins } = await api.authOauth2LinkedLogins.getAuthOauth2LinkedLogins.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Auth Oauth2 Linked Logins</h1>
        <NewAuthOauth2LinkedLoginModal />
      </div>
      <AuthOauth2LinkedLoginList authOauth2LinkedLogins={authOauth2LinkedLogins} />
    </main>
  );
}
