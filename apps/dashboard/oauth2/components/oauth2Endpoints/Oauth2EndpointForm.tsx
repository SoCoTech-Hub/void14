"use client";

import { Oauth2Endpoint, NewOauth2EndpointParams, insertOauth2EndpointParams } from "@soco/oauth2-db/schema/oauth2Endpoints";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Oauth2EndpointForm = ({
  oauth2Endpoint,
  closeModal,
}: {
  oauth2Endpoint?: Oauth2Endpoint;
  closeModal?: () => void;
}) => {
  const { data: oauth2issuers } = trpc.oauth2issuers.getOauth2issuers.useQuery();
  const editing = !!oauth2Endpoint?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertOauth2EndpointParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertOauth2EndpointParams),
    defaultValues: oauth2Endpoint ?? {
      oauth2issuerId: "",
     name: "",
     url: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.oauth2Endpoints.getOauth2Endpoints.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Oauth2 Endpoint ${action}d!`);
  };

  const { mutate: createOauth2Endpoint, isLoading: isCreating } =
    trpc.oauth2Endpoints.createOauth2Endpoint.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateOauth2Endpoint, isLoading: isUpdating } =
    trpc.oauth2Endpoints.updateOauth2Endpoint.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteOauth2Endpoint, isLoading: isDeleting } =
    trpc.oauth2Endpoints.deleteOauth2Endpoint.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewOauth2EndpointParams) => {
    if (editing) {
      updateOauth2Endpoint({ ...values, id: oauth2Endpoint.id });
    } else {
      createOauth2Endpoint(values);
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
          name="url"
          render={({ field }) => (<FormItem>
              <FormLabel>Url</FormLabel>
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
            onClick={() => deleteOauth2Endpoint({ id: oauth2Endpoint.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default Oauth2EndpointForm;
