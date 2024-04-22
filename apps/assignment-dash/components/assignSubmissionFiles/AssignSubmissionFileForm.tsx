"use client";

import { AssignSubmissionFile, NewAssignSubmissionFileParams, insertAssignSubmissionFileParams } from "@/lib/db/schema/assignSubmissionFiles";
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

const AssignSubmissionFileForm = ({
  assignSubmissionFile,
  closeModal,
}: {
  assignSubmissionFile?: AssignSubmissionFile;
  closeModal?: () => void;
}) => {
  const { data: assignments } = trpc.assignments.getAssignments.useQuery();
  const editing = !!assignSubmissionFile?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAssignSubmissionFileParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAssignSubmissionFileParams),
    defaultValues: assignSubmissionFile ?? {
      assignmentId: "",
     numFiles: 0,
     submission: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.assignSubmissionFiles.getAssignSubmissionFiles.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Assign Submission File ${action}d!`);
  };

  const { mutate: createAssignSubmissionFile, isLoading: isCreating } =
    trpc.assignSubmissionFiles.createAssignSubmissionFile.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAssignSubmissionFile, isLoading: isUpdating } =
    trpc.assignSubmissionFiles.updateAssignSubmissionFile.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAssignSubmissionFile, isLoading: isDeleting } =
    trpc.assignSubmissionFiles.deleteAssignSubmissionFile.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAssignSubmissionFileParams) => {
    if (editing) {
      updateAssignSubmissionFile({ ...values, id: assignSubmissionFile.id });
    } else {
      createAssignSubmissionFile(values);
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
          name="numFiles"
          render={({ field }) => (<FormItem>
              <FormLabel>Num Files</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="submission"
          render={({ field }) => (<FormItem>
              <FormLabel>Submission</FormLabel>
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
            onClick={() => deleteAssignSubmissionFile({ id: assignSubmissionFile.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AssignSubmissionFileForm;
