"use client";
import { CompleteAuthOauth2LinkedLogin } from "@/lib/db/schema/authOauth2LinkedLogins";
import { trpc } from "@/lib/trpc/client";
import AuthOauth2LinkedLoginModal from "./AuthOauth2LinkedLoginModal";


export default function AuthOauth2LinkedLoginList({ authOauth2LinkedLogins }: { authOauth2LinkedLogins: CompleteAuthOauth2LinkedLogin[] }) {
  const { data: a } = trpc.authOauth2LinkedLogins.getAuthOauth2LinkedLogins.useQuery(undefined, {
    initialData: { authOauth2LinkedLogins },
    refetchOnMount: false,
  });

  if (a.authOauth2LinkedLogins.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.authOauth2LinkedLogins.map((authOauth2LinkedLogin) => (
        <AuthOauth2LinkedLogin authOauth2LinkedLogin={authOauth2LinkedLogin} key={authOauth2LinkedLogin.id} />
      ))}
    </ul>
  );
}

const AuthOauth2LinkedLogin = ({ authOauth2LinkedLogin }: { authOauth2LinkedLogin: CompleteAuthOauth2LinkedLogin }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{authOauth2LinkedLogin.confirmToken}</div>
      </div>
      <AuthOauth2LinkedLoginModal authOauth2LinkedLogin={authOauth2LinkedLogin} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No auth oauth2 linked logins
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new auth oauth2 linked login.
      </p>
      <div className="mt-6">
        <AuthOauth2LinkedLoginModal emptyState={true} />
      </div>
    </div>
  );
};

