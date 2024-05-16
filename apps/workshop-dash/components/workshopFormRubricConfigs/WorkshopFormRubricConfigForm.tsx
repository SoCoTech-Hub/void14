"use client";

import { WorkshopFormRubricConfig, NewWorkshopFormRubricConfigParams, insertWorkshopFormRubricConfigParams } from "@/lib/db/schema/workshopFormRubricConfigs";
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

const WorkshopFormRubricConfigForm = ({
  workshopFormRubricConfig,
  closeModal,
}: {
  workshopFormRubricConfig?: WorkshopFormRubricConfig;
  closeModal?: () => void;
}) => {
  const { data: workshops } = trpc.workshops.getWorkshops.useQuery();
  const editing = !!workshopFormRubricConfig?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertWorkshopFormRubricConfigParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertWorkshopFormRubricConfigParams),
    defaultValues: workshopFormRubricConfig ?? {
      layout: "",
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

    await utils.workshopFormRubricConfigs.getWorkshopFormRubricConfigs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Workshop Form Rubric Config ${action}d!`);
  };

  const { mutate: createWorkshopFormRubricConfig, isLoading: isCreating } =
    trpc.workshopFormRubricConfigs.createWorkshopFormRubricConfig.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateWorkshopFormRubricConfig, isLoading: isUpdating } =
    trpc.workshopFormRubricConfigs.updateWorkshopFormRubricConfig.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteWorkshopFormRubricConfig, isLoading: isDeleting } =
    trpc.workshopFormRubricConfigs.deleteWorkshopFormRubricConfig.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewWorkshopFormRubricConfigParams) => {
    if (editing) {
      updateWorkshopFormRubricConfig({ ...values, id: workshopFormRubricConfig.id });
    } else {
      createWorkshopFormRubricConfig(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="layout"
          render={({ field }) => (<FormItem>
              <FormLabel>Layout</FormLabel>
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
            onClick={() => deleteWorkshopFormRubricConfig({ id: workshopFormRubricConfig.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default WorkshopFormRubricConfigForm;
