"use client";

import { GradingformRubricCriteria, NewGradingformRubricCriteriaParams, insertGradingformRubricCriteriaParams } from "@soco/grade-db/schema/gradingformRubricCriterias";
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

const GradingformRubricCriteriaForm = ({
  gradingformRubricCriteria,
  closeModal,
}: {
  gradingformRubricCriteria?: GradingformRubricCriteria;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradingformRubricCriteria?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradingformRubricCriteriaParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradingformRubricCriteriaParams),
    defaultValues: gradingformRubricCriteria ?? {
      definitionId: "",
     description: "",
     descriptionFormat: 0,
     sortOrder: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradingformRubricCriterias.getGradingformRubricCriterias.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Gradingform Rubric Criteria ${action}d!`);
  };

  const { mutate: createGradingformRubricCriteria, isLoading: isCreating } =
    trpc.gradingformRubricCriterias.createGradingformRubricCriteria.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradingformRubricCriteria, isLoading: isUpdating } =
    trpc.gradingformRubricCriterias.updateGradingformRubricCriteria.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradingformRubricCriteria, isLoading: isDeleting } =
    trpc.gradingformRubricCriterias.deleteGradingformRubricCriteria.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradingformRubricCriteriaParams) => {
    if (editing) {
      updateGradingformRubricCriteria({ ...values, id: gradingformRubricCriteria.id });
    } else {
      createGradingformRubricCriteria(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="definitionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Description Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Order</FormLabel>
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
            onClick={() => deleteGradingformRubricCriteria({ id: gradingformRubricCriteria.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradingformRubricCriteriaForm;
