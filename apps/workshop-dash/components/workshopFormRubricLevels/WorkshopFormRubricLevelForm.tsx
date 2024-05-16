"use client";

import { WorkshopFormRubricLevel, NewWorkshopFormRubricLevelParams, insertWorkshopFormRubricLevelParams } from "@/lib/db/schema/workshopFormRubricLevels";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const WorkshopFormRubricLevelForm = ({
  workshopFormRubricLevel,
  closeModal,
}: {
  workshopFormRubricLevel?: WorkshopFormRubricLevel;
  closeModal?: () => void;
}) => {
  
  const editing = !!workshopFormRubricLevel?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertWorkshopFormRubricLevelParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertWorkshopFormRubricLevelParams),
    defaultValues: workshopFormRubricLevel ?? {
      definition: "",
     definitionFormat: 0,
     dimensionId: "",
     grade: 0.0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.workshopFormRubricLevels.getWorkshopFormRubricLevels.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Workshop Form Rubric Level ${action}d!`);
  };

  const { mutate: createWorkshopFormRubricLevel, isLoading: isCreating } =
    trpc.workshopFormRubricLevels.createWorkshopFormRubricLevel.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateWorkshopFormRubricLevel, isLoading: isUpdating } =
    trpc.workshopFormRubricLevels.updateWorkshopFormRubricLevel.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteWorkshopFormRubricLevel, isLoading: isDeleting } =
    trpc.workshopFormRubricLevels.deleteWorkshopFormRubricLevel.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewWorkshopFormRubricLevelParams) => {
    if (editing) {
      updateWorkshopFormRubricLevel({ ...values, id: workshopFormRubricLevel.id });
    } else {
      createWorkshopFormRubricLevel(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="definition"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="definitionFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dimensionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Dimension Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade</FormLabel>
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
            onClick={() => deleteWorkshopFormRubricLevel({ id: workshopFormRubricLevel.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default WorkshopFormRubricLevelForm;
