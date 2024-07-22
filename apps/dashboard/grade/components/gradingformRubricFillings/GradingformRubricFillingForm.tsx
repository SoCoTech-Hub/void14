"use client";

import { GradingformRubricFilling, NewGradingformRubricFillingParams, insertGradingformRubricFillingParams } from "@soco/grade-db/schema/gradingformRubricFillings";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GradingformRubricFillingForm = ({
  gradingformRubricFilling,
  closeModal,
}: {
  gradingformRubricFilling?: GradingformRubricFilling;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradingformRubricFilling?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradingformRubricFillingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradingformRubricFillingParams),
    defaultValues: gradingformRubricFilling ?? {
      criterionId: "",
     instanceId: "",
     levelId: "",
     remark: "",
     remarkFormat: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradingformRubricFillings.getGradingformRubricFillings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Gradingform Rubric Filling ${action}d!`);
  };

  const { mutate: createGradingformRubricFilling, isLoading: isCreating } =
    trpc.gradingformRubricFillings.createGradingformRubricFilling.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradingformRubricFilling, isLoading: isUpdating } =
    trpc.gradingformRubricFillings.updateGradingformRubricFilling.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradingformRubricFilling, isLoading: isDeleting } =
    trpc.gradingformRubricFillings.deleteGradingformRubricFilling.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradingformRubricFillingParams) => {
    if (editing) {
      updateGradingformRubricFilling({ ...values, id: gradingformRubricFilling.id });
    } else {
      createGradingformRubricFilling(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="criterionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Criterion Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Instance Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="levelId"
          render={({ field }) => (<FormItem>
              <FormLabel>Level Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (<FormItem>
              <FormLabel>Remark</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarkFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Remark Format</FormLabel>
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
            onClick={() => deleteGradingformRubricFilling({ id: gradingformRubricFilling.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradingformRubricFillingForm;
