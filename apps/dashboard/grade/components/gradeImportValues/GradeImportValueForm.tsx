"use client";

import { GradeImportValue, NewGradeImportValueParams, insertGradeImportValueParams } from "@soco/grade-db/schema/gradeImportValues";
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
import { Checkbox } from "@soco/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GradeImportValueForm = ({
  gradeImportValue,
  closeModal,
}: {
  gradeImportValue?: GradeImportValue;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradeImportValue?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradeImportValueParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradeImportValueParams),
    defaultValues: gradeImportValue ?? {
      feedback: "",
     finalGrade: 0.0,
     importCode: "",
     importer: "",
     importOnlyFeedback: false,
     itemId: "",
     newGradeItem: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradeImportValues.getGradeImportValues.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Grade Import Value ${action}d!`);
  };

  const { mutate: createGradeImportValue, isLoading: isCreating } =
    trpc.gradeImportValues.createGradeImportValue.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradeImportValue, isLoading: isUpdating } =
    trpc.gradeImportValues.updateGradeImportValue.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradeImportValue, isLoading: isDeleting } =
    trpc.gradeImportValues.deleteGradeImportValue.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradeImportValueParams) => {
    if (editing) {
      updateGradeImportValue({ ...values, id: gradeImportValue.id });
    } else {
      createGradeImportValue(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Feedback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finalGrade"
          render={({ field }) => (<FormItem>
              <FormLabel>Final Grade</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="importCode"
          render={({ field }) => (<FormItem>
              <FormLabel>Import Code</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="importer"
          render={({ field }) => (<FormItem>
              <FormLabel>Importer</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="importOnlyFeedback"
          render={({ field }) => (<FormItem>
              <FormLabel>Import Only Feedback</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newGradeItem"
          render={({ field }) => (<FormItem>
              <FormLabel>New Grade Item</FormLabel>
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
            onClick={() => deleteGradeImportValue({ id: gradeImportValue.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradeImportValueForm;
