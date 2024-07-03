"use client";

import { MnetServiceEnrolEnrolment, NewMnetServiceEnrolEnrolmentParams, insertMnetServiceEnrolEnrolmentParams } from "@/lib/db/schema/mnetServiceEnrolEnrolments";
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

const MnetServiceEnrolEnrolmentForm = ({
  mnetServiceEnrolEnrolment,
  closeModal,
}: {
  mnetServiceEnrolEnrolment?: MnetServiceEnrolEnrolment;
  closeModal?: () => void;
}) => {
  const { data: mnetHosts } = trpc.mnetHosts.getMnetHosts.useQuery();
  const editing = !!mnetServiceEnrolEnrolment?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetServiceEnrolEnrolmentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetServiceEnrolEnrolmentParams),
    defaultValues: mnetServiceEnrolEnrolment ?? {
      enrolTime: 0,
     enrolType: "",
     mnetHostId: "",
     remoteCourseId: "",
     roleName: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetServiceEnrolEnrolments.getMnetServiceEnrolEnrolments.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Service Enrol Enrolment ${action}d!`);
  };

  const { mutate: createMnetServiceEnrolEnrolment, isLoading: isCreating } =
    trpc.mnetServiceEnrolEnrolments.createMnetServiceEnrolEnrolment.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetServiceEnrolEnrolment, isLoading: isUpdating } =
    trpc.mnetServiceEnrolEnrolments.updateMnetServiceEnrolEnrolment.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetServiceEnrolEnrolment, isLoading: isDeleting } =
    trpc.mnetServiceEnrolEnrolments.deleteMnetServiceEnrolEnrolment.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetServiceEnrolEnrolmentParams) => {
    if (editing) {
      updateMnetServiceEnrolEnrolment({ ...values, id: mnetServiceEnrolEnrolment.id });
    } else {
      createMnetServiceEnrolEnrolment(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="enrolTime"
          render={({ field }) => (<FormItem>
              <FormLabel>Enrol Time</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enrolType"
          render={({ field }) => (<FormItem>
              <FormLabel>Enrol Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mnetHostId"
          render={({ field }) => (<FormItem>
              <FormLabel>Mnet Host Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mnet host" />
                  </SelectTrigger>
                  <SelectContent>
                    {mnetHosts?.mnetHosts.map((mnetHost) => (
                      <SelectItem key={mnetHost.id} value={mnetHost.id.toString()}>
                        {mnetHost.id}  {/* TODO: Replace with a field from the mnetHost model */}
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
          name="remoteCourseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Remote Course Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleName"
          render={({ field }) => (<FormItem>
              <FormLabel>Role Name</FormLabel>
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
            onClick={() => deleteMnetServiceEnrolEnrolment({ id: mnetServiceEnrolEnrolment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetServiceEnrolEnrolmentForm;
