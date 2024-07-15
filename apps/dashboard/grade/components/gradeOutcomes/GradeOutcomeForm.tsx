"use client";

import { GradeOutcome, NewGradeOutcomeParams, insertGradeOutcomeParams } from "@soco/grade-db/schema/gradeOutcomes";
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

const GradeOutcomeForm = ({
  gradeOutcome,
  closeModal,
}: {
  gradeOutcome?: GradeOutcome;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradeOutcome?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradeOutcomeParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradeOutcomeParams),
    defaultValues: gradeOutcome ?? {
      courseId: "",
     description: "",
     descriptionFormat: 0,
     fullName: "",
     scaleId: "",
     shortName: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradeOutcomes.getGradeOutcomes.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Grade Outcome ${action}d!`);
  };

  const { mutate: createGradeOutcome, isLoading: isCreating } =
    trpc.gradeOutcomes.createGradeOutcome.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradeOutcome, isLoading: isUpdating } =
    trpc.gradeOutcomes.updateGradeOutcome.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradeOutcome, isLoading: isDeleting } =
    trpc.gradeOutcomes.deleteGradeOutcome.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradeOutcomeParams) => {
    if (editing) {
      updateGradeOutcome({ ...values, id: gradeOutcome.id });
    } else {
      createGradeOutcome(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
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
          name="fullName"
          render={({ field }) => (<FormItem>
              <FormLabel>Full Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scaleId"
          render={({ field }) => (<FormItem>
              <FormLabel>Scale Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortName"
          render={({ field }) => (<FormItem>
              <FormLabel>Short Name</FormLabel>
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
            onClick={() => deleteGradeOutcome({ id: gradeOutcome.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradeOutcomeForm;
