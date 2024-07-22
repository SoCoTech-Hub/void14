"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  AssignmentSubmission,
  insertAssignmentSubmissionParams,
  NewAssignmentSubmissionParams,
} from "@soco/assignment-db/schema/assignmentSubmissions";
import { Button } from "@soco/ui/button";
import { Calendar } from "@soco/ui/calendar";
import { Checkbox } from "@soco/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@soco/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@soco/ui/select";
import { cn } from "@soco/utils";

const AssignmentSubmissionForm = ({
  assignmentSubmission,
  closeModal,
}: {
  assignmentSubmission?: AssignmentSubmission;
  closeModal?: () => void;
}) => {
  const { data: assignments } = trpc.assignments.getAssignments.useQuery();
  const editing = !!assignmentSubmission?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAssignmentSubmissionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAssignmentSubmissionParams),
    defaultValues: assignmentSubmission ?? {
      assignmentId: "",
      data1: "",
      data2: "",
      format: 0,
      gradeId: "",
      mailed: false,
      numFiles: 0,
      submissionComment: "",
      teacherId: "",
      timeMarked: "",
    },
  });

  const onError = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }
    return;
  };

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(`Error on ${action}: ${data.error}`);
      return;
    }

    await utils.assignmentSubmissions.getAssignmentSubmissions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Assignment Submission ${action}d!`);
  };

  const { mutate: createAssignmentSubmission, isLoading: isCreating } =
    trpc.assignmentSubmissions.createAssignmentSubmission.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAssignmentSubmission, isLoading: isUpdating } =
    trpc.assignmentSubmissions.updateAssignmentSubmission.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAssignmentSubmission, isLoading: isDeleting } =
    trpc.assignmentSubmissions.deleteAssignmentSubmission.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAssignmentSubmissionParams) => {
    if (editing) {
      updateAssignmentSubmission({ ...values, id: assignmentSubmission.id });
    } else {
      createAssignmentSubmission(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="assignmentId"
          render={({ field }) => (
            <FormItem>
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
                      <SelectItem
                        key={assignment.id}
                        value={assignment.id.toString()}
                      >
                        {assignment.id}{" "}
                        {/* TODO: Replace with a field from the assignment model */}
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
          name="data1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data1</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data2</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Format</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Id</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mailed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mailed</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Num Files</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="submissionComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submission Comment</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher Id</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeMarked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Marked</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

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
            onClick={() =>
              deleteAssignmentSubmission({ id: assignmentSubmission.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AssignmentSubmissionForm;
