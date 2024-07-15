"use client";

import { Oauth2Issuer, NewOauth2IssuerParams, insertOauth2IssuerParams } from "@soco/oauth2-db/schema/oauth2Issuers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Oauth2IssuerForm = ({
  oauth2Issuer,
  closeModal,
}: {
  oauth2Issuer?: Oauth2Issuer;
  closeModal?: () => void;
}) => {
  
  const editing = !!oauth2Issuer?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertOauth2IssuerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertOauth2IssuerParams),
    defaultValues: oauth2Issuer ?? {
      allowedDomains: "",
     baseUrl: "",
     basicAuth: false,
     clientId: "",
     clientSecret: "",
     enabled: false,
     image: "",
     loginPageName: "",
     loginParams: "",
     loginParamsOffline: "",
     loginScopes: "",
     loginScopesOffline: "",
     scopesSupported: "",
     name: "",
     requireConfirmation: false,
     serviceType: "",
     showOnLoginPage: false,
     sortOrder: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.oauth2Issuers.getOauth2Issuers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Oauth2 Issuer ${action}d!`);
  };

  const { mutate: createOauth2Issuer, isLoading: isCreating } =
    trpc.oauth2Issuers.createOauth2Issuer.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateOauth2Issuer, isLoading: isUpdating } =
    trpc.oauth2Issuers.updateOauth2Issuer.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteOauth2Issuer, isLoading: isDeleting } =
    trpc.oauth2Issuers.deleteOauth2Issuer.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewOauth2IssuerParams) => {
    if (editing) {
      updateOauth2Issuer({ ...values, id: oauth2Issuer.id });
    } else {
      createOauth2Issuer(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="allowedDomains"
          render={({ field }) => (<FormItem>
              <FormLabel>Allowed Domains</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Base Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="basicAuth"
          render={({ field }) => (<FormItem>
              <FormLabel>Basic Auth</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (<FormItem>
              <FormLabel>Client Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientSecret"
          render={({ field }) => (<FormItem>
              <FormLabel>Client Secret</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (<FormItem>
              <FormLabel>Enabled</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (<FormItem>
              <FormLabel>Image</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loginPageName"
          render={({ field }) => (<FormItem>
              <FormLabel>Login Page Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loginParams"
          render={({ field }) => (<FormItem>
              <FormLabel>Login Params</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loginParamsOffline"
          render={({ field }) => (<FormItem>
              <FormLabel>Login Params Offline</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loginScopes"
          render={({ field }) => (<FormItem>
              <FormLabel>Login Scopes</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loginScopesOffline"
          render={({ field }) => (<FormItem>
              <FormLabel>Login Scopes Offline</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scopesSupported"
          render={({ field }) => (<FormItem>
              <FormLabel>Scopes Supported</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requireConfirmation"
          render={({ field }) => (<FormItem>
              <FormLabel>Require Confirmation</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (<FormItem>
              <FormLabel>Service Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showOnLoginPage"
          render={({ field }) => (<FormItem>
              <FormLabel>Show On Login Page</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Order</FormLabel>
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
            onClick={() => deleteOauth2Issuer({ id: oauth2Issuer.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default Oauth2IssuerForm;
