"use client";
import { CompleteAuthLtiLinkedLogin } from "@/lib/db/schema/authLtiLinkedLogins";
import { trpc } from "@/lib/trpc/client";
import AuthLtiLinkedLoginModal from "./AuthLtiLinkedLoginModal";


export default function AuthLtiLinkedLoginList({ authLtiLinkedLogins }: { authLtiLinkedLogins: CompleteAuthLtiLinkedLogin[] }) {
  const { data: a } = trpc.authLtiLinkedLogins.getAuthLtiLinkedLogins.useQuery(undefined, {
    initialData: { authLtiLinkedLogins },
    refetchOnMount: false,
  });

  if (a.authLtiLinkedLogins.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.authLtiLinkedLogins.map((authLtiLinkedLogin) => (
        <AuthLtiLinkedLogin authLtiLinkedLogin={authLtiLinkedLogin} key={authLtiLinkedLogin.id} />
      ))}
    </ul>
  );
}

const AuthLtiLinkedLogin = ({ authLtiLinkedLogin }: { authLtiLinkedLogin: CompleteAuthLtiLinkedLogin }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{authLtiLinkedLogin.issuer}</div>
      </div>
      <AuthLtiLinkedLoginModal authLtiLinkedLogin={authLtiLinkedLogin} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No auth lti linked logins
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new auth lti linked login.
      </p>
      <div className="mt-6">
        <AuthLtiLinkedLoginModal emptyState={true} />
      </div>
    </div>
  );
};

