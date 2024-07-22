"use client";

import { Oauth2UserFieldMapping, NewOauth2UserFieldMappingParams, insertOauth2UserFieldMappingParams } from "@soco/oauth2-db/schema/oauth2UserFieldMappings";
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

const Oauth2UserFieldMappingForm = ({
  oauth2UserFieldMapping,
  closeModal,
}: {
  oauth2UserFieldMapping?: Oauth2UserFieldMapping;
  closeModal?: () => void;
}) => {
  const { data: oauth2issuers } = trpc.oauth2issuers.getOauth2issuers.useQuery();
  const editing = !!oauth2UserFieldMapping?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertOauth2UserFieldMappingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertOauth2UserFieldMappingParams),
    defaultValues: oauth2UserFieldMapping ?? {
      externalField: "",
     internalField: "",
     oauth2issuerId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.oauth2UserFieldMappings.getOauth2UserFieldMappings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Oauth2 User Field Mapping ${action}d!`);
  };

  const { mutate: createOauth2UserFieldMapping, isLoading: isCreating } =
    trpc.oauth2UserFieldMappings.createOauth2UserFieldMapping.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateOauth2UserFieldMapping, isLoading: isUpdating } =
    trpc.oauth2UserFieldMappings.updateOauth2UserFieldMapping.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteOauth2UserFieldMapping, isLoading: isDeleting } =
    trpc.oauth2UserFieldMappings.deleteOauth2UserFieldMapping.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewOauth2UserFieldMappingParams) => {
    if (editing) {
      updateOauth2UserFieldMapping({ ...values, id: oauth2UserFieldMapping.id });
    } else {
      createOauth2UserFieldMapping(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="externalField"
          render={({ field }) => (<FormItem>
              <FormLabel>External Field</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="internalField"
          render={({ field }) => (<FormItem>
              <FormLabel>Internal Field</FormLabel>
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
            onClick={() => deleteOauth2UserFieldMapping({ id: oauth2UserFieldMapping.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default Oauth2UserFieldMappingForm;
