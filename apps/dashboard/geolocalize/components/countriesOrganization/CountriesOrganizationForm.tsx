"use client";

import { CountriesOrganization, NewCountriesOrganizationParams, insertCountriesOrganizationParams } from "@soco/geolocalize-db/schema/countriesOrganization";
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

const CountriesOrganizationForm = ({
  countriesOrganization,
  closeModal,
}: {
  countriesOrganization?: CountriesOrganization;
  closeModal?: () => void;
}) => {
  const { data: countries } = trpc.countries.getCountries.useQuery();
  const editing = !!countriesOrganization?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCountriesOrganizationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCountriesOrganizationParams),
    defaultValues: countriesOrganization ?? {
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

    await utils.countriesOrganization.getCountriesOrganization.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Countries Organization ${action}d!`);
  };

  const { mutate: createCountriesOrganization, isLoading: isCreating } =
    trpc.countriesOrganization.createCountriesOrganization.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCountriesOrganization, isLoading: isUpdating } =
    trpc.countriesOrganization.updateCountriesOrganization.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCountriesOrganization, isLoading: isDeleting } =
    trpc.countriesOrganization.deleteCountriesOrganization.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCountriesOrganizationParams) => {
    if (editing) {
      updateCountriesOrganization({ ...values, id: countriesOrganization.id });
    } else {
      createCountriesOrganization(values);
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
            onClick={() => deleteCountriesOrganization({ id: countriesOrganization.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CountriesOrganizationForm;
