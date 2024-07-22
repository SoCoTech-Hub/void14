"use client";

import { GradingformGuideComment, NewGradingformGuideCommentParams, insertGradingformGuideCommentParams } from "@soco/grade-db/schema/gradingformGuideComments";
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

const GradingformGuideCommentForm = ({
  gradingformGuideComment,
  closeModal,
}: {
  gradingformGuideComment?: GradingformGuideComment;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradingformGuideComment?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradingformGuideCommentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradingformGuideCommentParams),
    defaultValues: gradingformGuideComment ?? {
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

    await utils.gradingformGuideComments.getGradingformGuideComments.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Gradingform Guide Comment ${action}d!`);
  };

  const { mutate: createGradingformGuideComment, isLoading: isCreating } =
    trpc.gradingformGuideComments.createGradingformGuideComment.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradingformGuideComment, isLoading: isUpdating } =
    trpc.gradingformGuideComments.updateGradingformGuideComment.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradingformGuideComment, isLoading: isDeleting } =
    trpc.gradingformGuideComments.deleteGradingformGuideComment.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradingformGuideCommentParams) => {
    if (editing) {
      updateGradingformGuideComment({ ...values, id: gradingformGuideComment.id });
    } else {
      createGradingformGuideComment(values);
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
            onClick={() => deleteGradingformGuideComment({ id: gradingformGuideComment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradingformGuideCommentForm;
