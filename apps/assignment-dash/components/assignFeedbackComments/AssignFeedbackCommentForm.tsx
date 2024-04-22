"use client";

import { AssignFeedbackComment, NewAssignFeedbackCommentParams, insertAssignFeedbackCommentParams } from "@/lib/db/schema/assignFeedbackComments";
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

const AssignFeedbackCommentForm = ({
  assignFeedbackComment,
  closeModal,
}: {
  assignFeedbackComment?: AssignFeedbackComment;
  closeModal?: () => void;
}) => {
  const { data: assignments } = trpc.assignments.getAssignments.useQuery();
  const editing = !!assignFeedbackComment?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAssignFeedbackCommentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAssignFeedbackCommentParams),
    defaultValues: assignFeedbackComment ?? {
      assignmentId: "",
     commentFormat: 0,
     commentText: "",
     gradeId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.assignFeedbackComments.getAssignFeedbackComments.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Assign Feedback Comment ${action}d!`);
  };

  const { mutate: createAssignFeedbackComment, isLoading: isCreating } =
    trpc.assignFeedbackComments.createAssignFeedbackComment.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAssignFeedbackComment, isLoading: isUpdating } =
    trpc.assignFeedbackComments.updateAssignFeedbackComment.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAssignFeedbackComment, isLoading: isDeleting } =
    trpc.assignFeedbackComments.deleteAssignFeedbackComment.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAssignFeedbackCommentParams) => {
    if (editing) {
      updateAssignFeedbackComment({ ...values, id: assignFeedbackComment.id });
    } else {
      createAssignFeedbackComment(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="assignmentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Assignment Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignments?.assignments.map((assignment) => (
                      <SelectItem key={assignment.id} value={assignment.id.toString()}>
                        {assignment.id}  {/* TODO: Replace with a field from the assignment model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commentFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Comment Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commentText"
          render={({ field }) => (<FormItem>
              <FormLabel>Comment Text</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade Id</FormLabel>
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
            onClick={() => deleteAssignFeedbackComment({ id: assignFeedbackComment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AssignFeedbackCommentForm;
