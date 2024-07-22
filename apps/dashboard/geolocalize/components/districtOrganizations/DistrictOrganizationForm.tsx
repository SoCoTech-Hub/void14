"use client";

import { DistrictOrganization, NewDistrictOrganizationParams, insertDistrictOrganizationParams } from "@soco/geolocalize-db/schema/districtOrganizations";
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

const DistrictOrganizationForm = ({
  districtOrganization,
  closeModal,
}: {
  districtOrganization?: DistrictOrganization;
  closeModal?: () => void;
}) => {
  const { data: districts } = trpc.districts.getDistricts.useQuery();
  const editing = !!districtOrganization?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertDistrictOrganizationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDistrictOrganizationParams),
    defaultValues: districtOrganization ?? {
      districtId: "",
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

    await utils.districtOrganizations.getDistrictOrganizations.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`District Organization ${action}d!`);
  };

  const { mutate: createDistrictOrganization, isLoading: isCreating } =
    trpc.districtOrganizations.createDistrictOrganization.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateDistrictOrganization, isLoading: isUpdating } =
    trpc.districtOrganizations.updateDistrictOrganization.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteDistrictOrganization, isLoading: isDeleting } =
    trpc.districtOrganizations.deleteDistrictOrganization.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewDistrictOrganizationParams) => {
    if (editing) {
      updateDistrictOrganization({ ...values, id: districtOrganization.id });
    } else {
      createDistrictOrganization(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="districtId"
          render={({ field }) => (<FormItem>
              <FormLabel>District Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts?.districts.map((district) => (
                      <SelectItem key={district.district.id} value={district.district.id.toString()}>
                        {district.district.id}  {/* TODO: Replace with a field from the district model */}
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
            onClick={() => deleteDistrictOrganization({ id: districtOrganization.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default DistrictOrganizationForm;
