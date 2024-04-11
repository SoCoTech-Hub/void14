"use client";

import { SupportTopic, NewSupportTopicParams, insertSupportTopicParams } from "@/lib/db/schema/supportTopics";
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

const SupportTopicForm = ({
  supportTopic,
  closeModal,
}: {
  supportTopic?: SupportTopic;
  closeModal?: () => void;
}) => {
  const { data: supportDepartments } = trpc.supportDepartments.getSupportDepartments.useQuery();
  const editing = !!supportTopic?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSupportTopicParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSupportTopicParams),
    defaultValues: supportTopic ?? {
      name: "",
     supportDepartmentId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.supportTopics.getSupportTopics.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Support Topic ${action}d!`);
  };

  const { mutate: createSupportTopic, isLoading: isCreating } =
    trpc.supportTopics.createSupportTopic.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSupportTopic, isLoading: isUpdating } =
    trpc.supportTopics.updateSupportTopic.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSupportTopic, isLoading: isDeleting } =
    trpc.supportTopics.deleteSupportTopic.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSupportTopicParams) => {
    if (editing) {
      updateSupportTopic({ ...values, id: supportTopic.id });
    } else {
      createSupportTopic(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supportDepartmentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Support Department Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a support department" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportDepartments?.supportDepartments.map((supportDepartment) => (
                      <SelectItem key={supportDepartment.id} value={supportDepartment.id.toString()}>
                        {supportDepartment.name}  {/* TODO: Replace with a field from the supportDepartment model */}
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
            onClick={() => deleteSupportTopic({ id: supportTopic.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SupportTopicForm;
