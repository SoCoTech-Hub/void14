"use client";

import { MnetLog, NewMnetLogParams, insertMnetLogParams } from "@/lib/db/schema/mnetLogs";
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

const MnetLogForm = ({
  mnetLog,
  closeModal,
}: {
  mnetLog?: MnetLog;
  closeModal?: () => void;
}) => {
  const { data: mnetHosts } = trpc.mnetHosts.getMnetHosts.useQuery();
  const editing = !!mnetLog?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetLogParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetLogParams),
    defaultValues: mnetLog ?? {
      action: "",
     cmId: "",
     courseId: "",
     courseName: "",
     mnetHostId: "",
     info: "",
     ip: "",
     module: "",
     remoteId: "",
     time: 0,
     url: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetLogs.getMnetLogs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Log ${action}d!`);
  };

  const { mutate: createMnetLog, isLoading: isCreating } =
    trpc.mnetLogs.createMnetLog.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetLog, isLoading: isUpdating } =
    trpc.mnetLogs.updateMnetLog.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetLog, isLoading: isDeleting } =
    trpc.mnetLogs.deleteMnetLog.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetLogParams) => {
    if (editing) {
      updateMnetLog({ ...values, id: mnetLog.id });
    } else {
      createMnetLog(values);
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
          name="cmId"
          render={({ field }) => (<FormItem>
              <FormLabel>Cm Id</FormLabel>
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
          name="courseName"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Name</FormLabel>
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
          name="info"
          render={({ field }) => (<FormItem>
              <FormLabel>Info</FormLabel>
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
          name="module"
          render={({ field }) => (<FormItem>
              <FormLabel>Module</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remoteId"
          render={({ field }) => (<FormItem>
              <FormLabel>Remote Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (<FormItem>
              <FormLabel>Time</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (<FormItem>
              <FormLabel>Url</FormLabel>
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
            onClick={() => deleteMnetLog({ id: mnetLog.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetLogForm;
