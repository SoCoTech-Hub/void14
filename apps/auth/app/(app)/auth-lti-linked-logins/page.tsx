import AuthLtiLinkedLoginList from "@/components/authLtiLinkedLogins/AuthLtiLinkedLoginList";
import NewAuthLtiLinkedLoginModal from "@/components/authLtiLinkedLogins/AuthLtiLinkedLoginModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function AuthLtiLinkedLogins() {
  await checkAuth();
  const { authLtiLinkedLogins } = await api.authLtiLinkedLogins.getAuthLtiLinkedLogins.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Auth Lti Linked Logins</h1>
        <NewAuthLtiLinkedLoginModal />
      </div>
      <AuthLtiLinkedLoginList authLtiLinkedLogins={authLtiLinkedLogins} />
    </main>
  );
}
