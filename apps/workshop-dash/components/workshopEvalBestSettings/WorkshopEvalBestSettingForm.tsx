"use client";

import { WorkshopEvalBestSetting, NewWorkshopEvalBestSettingParams, insertWorkshopEvalBestSettingParams } from "@/lib/db/schema/workshopEvalBestSettings";
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

const WorkshopEvalBestSettingForm = ({
  workshopEvalBestSetting,
  closeModal,
}: {
  workshopEvalBestSetting?: WorkshopEvalBestSetting;
  closeModal?: () => void;
}) => {
  const { data: workshops } = trpc.workshops.getWorkshops.useQuery();
  const editing = !!workshopEvalBestSetting?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertWorkshopEvalBestSettingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertWorkshopEvalBestSettingParams),
    defaultValues: workshopEvalBestSetting ?? {
      comparison: 0,
     workshopId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.workshopEvalBestSettings.getWorkshopEvalBestSettings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Workshop Eval Best Setting ${action}d!`);
  };

  const { mutate: createWorkshopEvalBestSetting, isLoading: isCreating } =
    trpc.workshopEvalBestSettings.createWorkshopEvalBestSetting.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateWorkshopEvalBestSetting, isLoading: isUpdating } =
    trpc.workshopEvalBestSettings.updateWorkshopEvalBestSetting.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteWorkshopEvalBestSetting, isLoading: isDeleting } =
    trpc.workshopEvalBestSettings.deleteWorkshopEvalBestSetting.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewWorkshopEvalBestSettingParams) => {
    if (editing) {
      updateWorkshopEvalBestSetting({ ...values, id: workshopEvalBestSetting.id });
    } else {
      createWorkshopEvalBestSetting(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="comparison"
          render={({ field }) => (<FormItem>
              <FormLabel>Comparison</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workshopId"
          render={({ field }) => (<FormItem>
              <FormLabel>Workshop Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workshop" />
                  </SelectTrigger>
                  <SelectContent>
                    {workshops?.workshops.map((workshop) => (
                      <SelectItem key={workshop.id} value={workshop.id.toString()}>
                        {workshop.id}  {/* TODO: Replace with a field from the workshop model */}
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
            onClick={() => deleteWorkshopEvalBestSetting({ id: workshopEvalBestSetting.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default WorkshopEvalBestSettingForm;
