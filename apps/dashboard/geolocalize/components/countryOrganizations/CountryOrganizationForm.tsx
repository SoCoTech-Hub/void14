"use client";

import { CountryOrganization, NewCountryOrganizationParams, insertCountryOrganizationParams } from "@soco/geolocalize-db/schema/countryOrganizations";
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

const CountryOrganizationForm = ({
  countryOrganization,
  closeModal,
}: {
  countryOrganization?: CountryOrganization;
  closeModal?: () => void;
}) => {
  const { data: countries } = trpc.countries.getCountries.useQuery();
  const editing = !!countryOrganization?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCountryOrganizationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCountryOrganizationParams),
    defaultValues: countryOrganization ?? {
      countryId: "",
     organizationId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.countryOrganizations.getCountryOrganizations.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Country Organization ${action}d!`);
  };

  const { mutate: createCountryOrganization, isLoading: isCreating } =
    trpc.countryOrganizations.createCountryOrganization.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCountryOrganization, isLoading: isUpdating } =
    trpc.countryOrganizations.updateCountryOrganization.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCountryOrganization, isLoading: isDeleting } =
    trpc.countryOrganizations.deleteCountryOrganization.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCountryOrganizationParams) => {
    if (editing) {
      updateCountryOrganization({ ...values, id: countryOrganization.id });
    } else {
      createCountryOrganization(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Country Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries?.countries.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.id}  {/* TODO: Replace with a field from the country model */}
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
          name="organizationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Organization Id</FormLabel>
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
            onClick={() => deleteCountryOrganization({ id: countryOrganization.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CountryOrganizationForm;
