"use client";

import { ProvinceOrganization, NewProvinceOrganizationParams, insertProvinceOrganizationParams } from "@soco/geolocalize-db/schema/provinceOrganizations";
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

const ProvinceOrganizationForm = ({
  provinceOrganization,
  closeModal,
}: {
  provinceOrganization?: ProvinceOrganization;
  closeModal?: () => void;
}) => {
  const { data: provinces } = trpc.provinces.getProvinces.useQuery();
  const editing = !!provinceOrganization?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertProvinceOrganizationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertProvinceOrganizationParams),
    defaultValues: provinceOrganization ?? {
      provinceId: "",
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

    await utils.provinceOrganizations.getProvinceOrganizations.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Province Organization ${action}d!`);
  };

  const { mutate: createProvinceOrganization, isLoading: isCreating } =
    trpc.provinceOrganizations.createProvinceOrganization.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateProvinceOrganization, isLoading: isUpdating } =
    trpc.provinceOrganizations.updateProvinceOrganization.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteProvinceOrganization, isLoading: isDeleting } =
    trpc.provinceOrganizations.deleteProvinceOrganization.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewProvinceOrganizationParams) => {
    if (editing) {
      updateProvinceOrganization({ ...values, id: provinceOrganization.id });
    } else {
      createProvinceOrganization(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="provinceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Province Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces?.provinces.map((province) => (
                      <SelectItem key={province.province.id} value={province.province.id.toString()}>
                        {province.province.id}  {/* TODO: Replace with a field from the province model */}
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
            onClick={() => deleteProvinceOrganization({ id: provinceOrganization.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ProvinceOrganizationForm;
