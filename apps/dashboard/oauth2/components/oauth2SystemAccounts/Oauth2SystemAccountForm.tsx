"use client";

import { Oauth2SystemAccount, NewOauth2SystemAccountParams, insertOauth2SystemAccountParams } from "@soco/oauth2-db/schema/oauth2SystemAccounts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@soco/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Oauth2SystemAccountForm = ({
  oauth2SystemAccount,
  closeModal,
}: {
  oauth2SystemAccount?: Oauth2SystemAccount;
  closeModal?: () => void;
}) => {
  const { data: oauth2issuers } = trpc.oauth2issuers.getOauth2issuers.useQuery();
  const editing = !!oauth2SystemAccount?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertOauth2SystemAccountParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertOauth2SystemAccountParams),
    defaultValues: oauth2SystemAccount ?? {
      email: "",
     grantedScopes: "",
     oauth2issuerId: "",
     refreshToken: "",
     username: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.oauth2SystemAccounts.getOauth2SystemAccounts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Oauth2 System Account ${action}d!`);
  };

  const { mutate: createOauth2SystemAccount, isLoading: isCreating } =
    trpc.oauth2SystemAccounts.createOauth2SystemAccount.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateOauth2SystemAccount, isLoading: isUpdating } =
    trpc.oauth2SystemAccounts.updateOauth2SystemAccount.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteOauth2SystemAccount, isLoading: isDeleting } =
    trpc.oauth2SystemAccounts.deleteOauth2SystemAccount.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewOauth2SystemAccountParams) => {
    if (editing) {
      updateOauth2SystemAccount({ ...values, id: oauth2SystemAccount.id });
    } else {
      createOauth2SystemAccount(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (<FormItem>
              <FormLabel>Email</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grantedScopes"
          render={({ field }) => (<FormItem>
              <FormLabel>Granted Scopes</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oauth2issuerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Oauth2issuer Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a oauth2issuer" />
                  </SelectTrigger>
                  <SelectContent>
                    {oauth2issuers?.oauth2issuers.map((oauth2issuer) => (
                      <SelectItem key={oauth2issuer.id} value={oauth2issuer.id.toString()}>
                        {oauth2issuer.id}  {/* TODO: Replace with a field from the oauth2issuer model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="refreshToken"
          render={({ field }) => (<FormItem>
              <FormLabel>Refresh Token</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (<FormItem>
              <FormLabel>Username</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteOauth2SystemAccount({ id: oauth2SystemAccount.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default Oauth2SystemAccountForm;
