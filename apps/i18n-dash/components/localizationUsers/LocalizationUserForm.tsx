"use client";

import { LocalizationUser, NewLocalizationUserParams, insertLocalizationUserParams } from "@/lib/db/schema/localizationUsers";
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

const LocalizationUserForm = ({
  localizationUser,
  closeModal,
}: {
  localizationUser?: LocalizationUser;
  closeModal?: () => void;
}) => {
  const { data: localizationLanguages } = trpc.localizationLanguages.getLocalizationLanguages.useQuery();
  const editing = !!localizationUser?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLocalizationUserParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLocalizationUserParams),
    defaultValues: localizationUser ?? {
      localizationLanguageId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.localizationUsers.getLocalizationUsers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Localization User ${action}d!`);
  };

  const { mutate: createLocalizationUser, isLoading: isCreating } =
    trpc.localizationUsers.createLocalizationUser.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLocalizationUser, isLoading: isUpdating } =
    trpc.localizationUsers.updateLocalizationUser.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLocalizationUser, isLoading: isDeleting } =
    trpc.localizationUsers.deleteLocalizationUser.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLocalizationUserParams) => {
    if (editing) {
      updateLocalizationUser({ ...values, id: localizationUser.id });
    } else {
      createLocalizationUser(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="localizationLanguageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Localization Language Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a localization language" />
                  </SelectTrigger>
                  <SelectContent>
                    {localizationLanguages?.localizationLanguages.map((localizationLanguage) => (
                      <SelectItem key={localizationLanguage.id} value={localizationLanguage.id.toString()}>
                        {localizationLanguage.id}  {/* TODO: Replace with a field from the localizationLanguage model */}
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
            onClick={() => deleteLocalizationUser({ id: localizationUser.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LocalizationUserForm;
