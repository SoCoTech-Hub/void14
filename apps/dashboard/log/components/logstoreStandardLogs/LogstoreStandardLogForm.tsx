"use client";

import { LogstoreStandardLog, NewLogstoreStandardLogParams, insertLogstoreStandardLogParams } from "@soco/log-db/schema/logstoreStandardLogs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogstoreStandardLogForm = ({
  logstoreStandardLog,
  closeModal,
}: {
  logstoreStandardLog?: LogstoreStandardLog;
  closeModal?: () => void;
}) => {
  
  const editing = !!logstoreStandardLog?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLogstoreStandardLogParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLogstoreStandardLogParams),
    defaultValues: logstoreStandardLog ?? {
      action: "",
     anonymous: false,
     component: "",
     contextId: "",
     contextInstanceId: "",
     contextLevel: 0,
     courseId: "",
     crud: "",
     eduLevel: false,
     eventName: "",
     ip: "",
     objectId: "",
     objectTable: "",
     origin: "",
     other: "",
     realUserId: "",
     relatedUserId: "",
     target: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.logstoreStandardLogs.getLogstoreStandardLogs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Logstore Standard Log ${action}d!`);
  };

  const { mutate: createLogstoreStandardLog, isLoading: isCreating } =
    trpc.logstoreStandardLogs.createLogstoreStandardLog.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLogstoreStandardLog, isLoading: isUpdating } =
    trpc.logstoreStandardLogs.updateLogstoreStandardLog.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLogstoreStandardLog, isLoading: isDeleting } =
    trpc.logstoreStandardLogs.deleteLogstoreStandardLog.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLogstoreStandardLogParams) => {
    if (editing) {
      updateLogstoreStandardLog({ ...values, id: logstoreStandardLog.id });
    } else {
      createLogstoreStandardLog(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (<FormItem>
              <FormLabel>Action</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (<FormItem>
              <FormLabel>Anonymous</FormLabel>
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
          name="component"
          render={({ field }) => (<FormItem>
              <FormLabel>Component</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextInstanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Instance Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contextLevel"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Level</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="crud"
          render={({ field }) => (<FormItem>
              <FormLabel>Crud</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eduLevel"
          render={({ field }) => (<FormItem>
              <FormLabel>Edu Level</FormLabel>
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
          name="eventName"
          render={({ field }) => (<FormItem>
              <FormLabel>Event Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (<FormItem>
              <FormLabel>Ip</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objectId"
          render={({ field }) => (<FormItem>
              <FormLabel>Object Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objectTable"
          render={({ field }) => (<FormItem>
              <FormLabel>Object Table</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (<FormItem>
              <FormLabel>Origin</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="other"
          render={({ field }) => (<FormItem>
              <FormLabel>Other</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="realUserId"
          render={({ field }) => (<FormItem>
              <FormLabel>Real User Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relatedUserId"
          render={({ field }) => (<FormItem>
              <FormLabel>Related User Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (<FormItem>
              <FormLabel>Target</FormLabel>
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
            onClick={() => deleteLogstoreStandardLog({ id: logstoreStandardLog.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LogstoreStandardLogForm;
