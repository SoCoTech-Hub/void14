"use client";

import type { z } from "zod";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type {
  AdminPresetAppPlug,
  NewAdminPresetAppPlugParams,
} from "@soco/admin-preset-db/schema/adminPresetAppPlugs";
import { insertAdminPresetAppPlugParams } from "@soco/admin-preset-db/schema/adminPresetAppPlugs";
import { Button } from "@soco/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@soco/ui/select";

const AdminPresetAppPlugForm = ({
  adminPresetAppPlug,
  closeModal,
}: {
  adminPresetAppPlug?: AdminPresetAppPlug;
  closeModal?: () => void;
}) => {
  const { data: adminPresetsApps } =
    trpc.adminPresetsApps.getAdminPresetsApps.useQuery();
  const editing = !!adminPresetAppPlug?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAdminPresetAppPlugParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAdminPresetAppPlugParams),
    defaultValues: adminPresetAppPlug ?? {
      name: "",
      adminPresetsAppId: "",
      oldValue: 0,
      value: 0,
      plugin: "",
    },
  });

  const onError = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }
    return;
  };

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }

    await utils.adminPresetAppPlugs.getAdminPresetAppPlugs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Admin Preset App Plug ${action}d!`);
  };

  const { mutate: createAdminPresetAppPlug, isLoading: isCreating } =
    trpc.adminPresetAppPlugs.createAdminPresetAppPlug.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAdminPresetAppPlug, isLoading: isUpdating } =
    trpc.adminPresetAppPlugs.updateAdminPresetAppPlug.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAdminPresetAppPlug, isLoading: isDeleting } =
    trpc.adminPresetAppPlugs.deleteAdminPresetAppPlug.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAdminPresetAppPlugParams) => {
    if (editing) {
      updateAdminPresetAppPlug({ ...values, id: adminPresetAppPlug.id });
    } else {
      createAdminPresetAppPlug(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adminPresetsAppId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Presets App Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a admin presets app" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminPresetsApps?.adminPresetsApps.map(
                      (adminPresetsApp) => (
                        <SelectItem
                          key={adminPresetsApp.adminPresetsApp.id}
                          value={adminPresetsApp.adminPresetsApp.id.toString()}
                        >
                          {adminPresetsApp.adminPresetsApp.id}{" "}
                          {/* TODO: Replace with a field from the adminPresetsApp model */}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Value</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plugin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plugin</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
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
            onClick={() =>
              deleteAdminPresetAppPlug({ id: adminPresetAppPlug.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AdminPresetAppPlugForm;
