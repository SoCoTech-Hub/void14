"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  insertTaskScheduleParams,
  NewTaskScheduleParams,
  TaskSchedule,
} from "@/lib/db/schema/taskSchedules";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const TaskScheduleForm = ({
  taskSchedule,
  closeModal,
}: {
  taskSchedule?: TaskSchedule;
  closeModal?: () => void;
}) => {
  const editing = !!taskSchedule?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertTaskScheduleParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTaskScheduleParams),
    defaultValues: taskSchedule ?? {
      blocking: false,
      classname: "",
      component: "",
      customised: false,
      day: "",
      dayOfWeek: "",
      disabled: false,
      failDelay: 0,
      hostname: "",
      hour: "",
      lastRuntime: "",
      minute: "",
      month: "",
      nextRuntime: "",
      pid: "",
      timeStarted: "",
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.taskSchedules.getTaskSchedules.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Task Schedule ${action}d!`);
  };

  const { mutate: createTaskSchedule, isLoading: isCreating } =
    trpc.taskSchedules.createTaskSchedule.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onSuccess("create", { error: err.message }),
    });

  const { mutate: updateTaskSchedule, isLoading: isUpdating } =
    trpc.taskSchedules.updateTaskSchedule.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onSuccess("update", { error: err.message }),
    });

  const { mutate: deleteTaskSchedule, isLoading: isDeleting } =
    trpc.taskSchedules.deleteTaskSchedule.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onSuccess("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewTaskScheduleParams) => {
    if (editing) {
      updateTaskSchedule({ ...values, id: taskSchedule.id });
    } else {
      createTaskSchedule(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="blocking"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blocking</FormLabel>
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
          name="classname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="component"
          render={({ field }) => (
            <FormItem>
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
          name="customised"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customised</FormLabel>
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
          name="day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day Of Week</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="disabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disabled</FormLabel>
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
          name="failDelay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fail Delay</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hostname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hostname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hour</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastRuntime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Runtime</FormLabel>
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
        <FormField
          control={form.control}
          name="minute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minute</FormLabel>
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
            onClick={() => deleteTaskSchedule({ id: taskSchedule.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default TaskScheduleForm;
