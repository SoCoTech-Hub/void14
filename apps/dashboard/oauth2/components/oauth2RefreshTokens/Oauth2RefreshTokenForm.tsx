"use client";

import { Oauth2RefreshToken, NewOauth2RefreshTokenParams, insertOauth2RefreshTokenParams } from "@soco/oauth2-db/schema/oauth2RefreshTokens";
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

const Oauth2RefreshTokenForm = ({
  oauth2RefreshToken,
  closeModal,
}: {
  oauth2RefreshToken?: Oauth2RefreshToken;
  closeModal?: () => void;
}) => {
  const { data: oauth2issuers } = trpc.oauth2issuers.getOauth2issuers.useQuery();
  const editing = !!oauth2RefreshToken?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertOauth2RefreshTokenParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertOauth2RefreshTokenParams),
    defaultValues: oauth2RefreshToken ?? {
      oauth2issuerId: "",
     scopeHash: "",
     token: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.oauth2RefreshTokens.getOauth2RefreshTokens.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Oauth2 Refresh Token ${action}d!`);
  };

  const { mutate: createOauth2RefreshToken, isLoading: isCreating } =
    trpc.oauth2RefreshTokens.createOauth2RefreshToken.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateOauth2RefreshToken, isLoading: isUpdating } =
    trpc.oauth2RefreshTokens.updateOauth2RefreshToken.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteOauth2RefreshToken, isLoading: isDeleting } =
    trpc.oauth2RefreshTokens.deleteOauth2RefreshToken.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewOauth2RefreshTokenParams) => {
    if (editing) {
      updateOauth2RefreshToken({ ...values, id: oauth2RefreshToken.id });
    } else {
      createOauth2RefreshToken(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="scopeHash"
          render={({ field }) => (<FormItem>
              <FormLabel>Scope Hash</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (<FormItem>
              <FormLabel>Token</FormLabel>
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
            onClick={() => deleteOauth2RefreshToken({ id: oauth2RefreshToken.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default Oauth2RefreshTokenForm;
