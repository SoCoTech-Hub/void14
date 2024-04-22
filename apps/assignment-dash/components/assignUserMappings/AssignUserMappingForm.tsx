"use client";

import { AssignUserMapping, NewAssignUserMappingParams, insertAssignUserMappingParams } from "@/lib/db/schema/assignUserMappings";
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

const AssignUserMappingForm = ({
  assignUserMapping,
  closeModal,
}: {
  assignUserMapping?: AssignUserMapping;
  closeModal?: () => void;
}) => {
  const { data: assignments } = trpc.assignments.getAssignments.useQuery();
  const editing = !!assignUserMapping?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAssignUserMappingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAssignUserMappingParams),
    defaultValues: assignUserMapping ?? {
      assignmentId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.assignUserMappings.getAssignUserMappings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Assign User Mapping ${action}d!`);
  };

  const { mutate: createAssignUserMapping, isLoading: isCreating } =
    trpc.assignUserMappings.createAssignUserMapping.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateAssignUserMapping, isLoading: isUpdating } =
    trpc.assignUserMappings.updateAssignUserMapping.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteAssignUserMapping, isLoading: isDeleting } =
    trpc.assignUserMappings.deleteAssignUserMapping.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewAssignUserMappingParams) => {
    if (editing) {
      updateAssignUserMapping({ ...values, id: assignUserMapping.id });
    } else {
      createAssignUserMapping(values);
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
            onClick={() => deleteAssignUserMapping({ id: assignUserMapping.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AssignUserMappingForm;
