"use client";

import { LocalizationTranslation, NewLocalizationTranslationParams, insertLocalizationTranslationParams } from "@/lib/db/schema/localizationTranslations";
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

const LocalizationTranslationForm = ({
  localizationTranslation,
  closeModal,
}: {
  localizationTranslation?: LocalizationTranslation;
  closeModal?: () => void;
}) => {
  const { data: localizationFields } = trpc.localizationFields.getLocalizationFields.useQuery();
  const { data: localizationLanguages } = trpc.localizationLanguages.getLocalizationLanguages.useQuery();
  const editing = !!localizationTranslation?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLocalizationTranslationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLocalizationTranslationParams),
    defaultValues: localizationTranslation ?? {
      localizationFieldId: "",
     localizationLanguageId: "",
     value: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.localizationTranslations.getLocalizationTranslations.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Localization Translation ${action}d!`);
  };

  const { mutate: createLocalizationTranslation, isLoading: isCreating } =
    trpc.localizationTranslations.createLocalizationTranslation.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLocalizationTranslation, isLoading: isUpdating } =
    trpc.localizationTranslations.updateLocalizationTranslation.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLocalizationTranslation, isLoading: isDeleting } =
    trpc.localizationTranslations.deleteLocalizationTranslation.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLocalizationTranslationParams) => {
    if (editing) {
      updateLocalizationTranslation({ ...values, id: localizationTranslation.id });
    } else {
      createLocalizationTranslation(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="localizationFieldId"
          render={({ field }) => (<FormItem>
              <FormLabel>Localization Field Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a localization field" />
                  </SelectTrigger>
                  <SelectContent>
                    {localizationFields?.localizationFields.map((localizationField) => (
                      <SelectItem key={localizationField.id} value={localizationField.id.toString()}>
                        {localizationField.name}  {/* TODO: Replace with a field from the localizationField model */}
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
                        {localizationLanguage.name}  {/* TODO: Replace with a field from the localizationLanguage model */}
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
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
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
            onClick={() => deleteLocalizationTranslation({ id: localizationTranslation.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LocalizationTranslationForm;
