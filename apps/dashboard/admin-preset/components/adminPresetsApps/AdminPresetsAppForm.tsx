"use client";

import { useRouter } from "next/navigation";
import { Button } from "@soco/ui/button";
import { Calendar } from "@soco/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@soco/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@soco/ui/select";
import {
  AdminPresetsApp,
  insertAdminPresetsAppParams,
  NewAdminPresetsAppParams,
} from "@soco/admin-preset-db/schema/adminPresetsApps";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const AdminPresetsAppForm = ({
  adminPresetsApp,
  closeModal,
}: {
  adminPresetsApp?: AdminPresetsApp;
  closeModal?: () => void;
}) => {
  const { data: adminPresets } = trpc.adminPresets.getAdminPresets.useQuery();
  const editing = !!adminPresetsApp?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAdminPresetsAppParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAdminPresetsAppParams),
    defaultValues: adminPresetsApp ?? {
      time: "",
      adminPresetId: "",
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.adminPresetsApps.getAdminPresetsApps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Admin Presets App ${action}d!`);
  };

  const { mutate: createAdminPresetsApp, isLoading: isCreating } =
    trpc.adminPresetsApps.createAdminPresetsApp.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAdminPresetsApp, isLoading: isUpdating } =
    trpc.adminPresetsApps.updateAdminPresetsApp.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAdminPresetsApp, isLoading: isDeleting } =
    trpc.adminPresetsApps.deleteAdminPresetsApp.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAdminPresetsAppParams) => {
    if (editing) {
      updateAdminPresetsApp({ ...values, id: adminPresetsApp.id });
    } else {
      createAdminPresetsApp(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adminPresetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Preset Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a admin preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminPresets?.adminPresets.map((adminPreset) => (
                      <SelectItem
                        key={adminPreset.id}
                        value={adminPreset.id.toString()}
                      >
                        {adminPreset.id}{" "}
                        {/* TODO: Replace with a field from the adminPreset model */}
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
            onClick={() => deleteAdminPresetsApp({ id: adminPresetsApp.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AdminPresetsAppForm;
