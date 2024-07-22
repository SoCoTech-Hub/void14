"use client";

import { GradingformRubricLevel, NewGradingformRubricLevelParams, insertGradingformRubricLevelParams } from "@soco/grade-db/schema/gradingformRubricLevels";
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

const GradingformRubricLevelForm = ({
  gradingformRubricLevel,
  closeModal,
}: {
  gradingformRubricLevel?: GradingformRubricLevel;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradingformRubricLevel?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradingformRubricLevelParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradingformRubricLevelParams),
    defaultValues: gradingformRubricLevel ?? {
      criterionId: "",
     definition: "",
     definitionFormat: 0,
     score: 0.0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradingformRubricLevels.getGradingformRubricLevels.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Gradingform Rubric Level ${action}d!`);
  };

  const { mutate: createGradingformRubricLevel, isLoading: isCreating } =
    trpc.gradingformRubricLevels.createGradingformRubricLevel.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradingformRubricLevel, isLoading: isUpdating } =
    trpc.gradingformRubricLevels.updateGradingformRubricLevel.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradingformRubricLevel, isLoading: isDeleting } =
    trpc.gradingformRubricLevels.deleteGradingformRubricLevel.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradingformRubricLevelParams) => {
    if (editing) {
      updateGradingformRubricLevel({ ...values, id: gradingformRubricLevel.id });
    } else {
      createGradingformRubricLevel(values);
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
          name="score"
          render={({ field }) => (<FormItem>
              <FormLabel>Score</FormLabel>
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
            onClick={() => deleteGradingformRubricLevel({ id: gradingformRubricLevel.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradingformRubricLevelForm;
