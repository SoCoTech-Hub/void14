"use client";

import { CohortMember, NewCohortMemberParams, insertCohortMemberParams } from "@/lib/db/schema/cohortMembers";
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

const CohortMemberForm = ({
  cohortMember,
  closeModal,
}: {
  cohortMember?: CohortMember;
  closeModal?: () => void;
}) => {
  const { data: cohorts } = trpc.cohorts.getCohorts.useQuery();
  const editing = !!cohortMember?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCohortMemberParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCohortMemberParams),
    defaultValues: cohortMember ?? {
      cohortId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.cohortMembers.getCohortMembers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Cohort Member ${action}d!`);
  };

  const { mutate: createCohortMember, isLoading: isCreating } =
    trpc.cohortMembers.createCohortMember.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCohortMember, isLoading: isUpdating } =
    trpc.cohortMembers.updateCohortMember.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCohortMember, isLoading: isDeleting } =
    trpc.cohortMembers.deleteCohortMember.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCohortMemberParams) => {
    if (editing) {
      updateCohortMember({ ...values, id: cohortMember.id });
    } else {
      createCohortMember(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="cohortId"
          render={({ field }) => (<FormItem>
              <FormLabel>Cohort Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cohort" />
                  </SelectTrigger>
                  <SelectContent>
                    {cohorts?.cohorts.map((cohort) => (
                      <SelectItem key={cohort.id} value={cohort.id.toString()}>
                        {cohort.name}  {/* TODO: Replace with a field from the cohort model */}
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
            onClick={() => deleteCohortMember({ id: cohortMember.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CohortMemberForm;
