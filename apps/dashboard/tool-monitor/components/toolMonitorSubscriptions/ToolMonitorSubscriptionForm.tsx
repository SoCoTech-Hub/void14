"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  insertToolMonitorSubscriptionParams,
  NewToolMonitorSubscriptionParams,
  ToolMonitorSubscription,
} from "@/lib/db/schema/toolMonitorSubscriptions";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const ToolMonitorSubscriptionForm = ({
  toolMonitorSubscription,
  closeModal,
}: {
  toolMonitorSubscription?: ToolMonitorSubscription;
  closeModal?: () => void;
}) => {
  const { data: toolMonitorRules } =
    trpc.toolMonitorRules.getToolMonitorRules.useQuery();
  const editing = !!toolMonitorSubscription?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolMonitorSubscriptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolMonitorSubscriptionParams),
    defaultValues: toolMonitorSubscription ?? {
      cmId: "",
      courseId: "",
      inactiveDate: "",
      lastNotificationSent: "",
      toolMonitorRuleId: "",
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

    await utils.toolMonitorSubscriptions.getToolMonitorSubscriptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Tool Monitor Subscription ${action}d!`);
  };

  const { mutate: createToolMonitorSubscription, isLoading: isCreating } =
    trpc.toolMonitorSubscriptions.createToolMonitorSubscription.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolMonitorSubscription, isLoading: isUpdating } =
    trpc.toolMonitorSubscriptions.updateToolMonitorSubscription.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolMonitorSubscription, isLoading: isDeleting } =
    trpc.toolMonitorSubscriptions.deleteToolMonitorSubscription.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolMonitorSubscriptionParams) => {
    if (editing) {
      updateToolMonitorSubscription({
        ...values,
        id: toolMonitorSubscription.id,
      });
    } else {
      createToolMonitorSubscription(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="cmId"
          render={({ field }) => (
            <FormItem>
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
          render={({ field }) => (
            <FormItem>
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
          name="inactiveDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inactive Date</FormLabel>
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
          name="lastNotificationSent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Notification Sent</FormLabel>
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
          name="toolMonitorRuleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool Monitor Rule Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool monitor rule" />
                  </SelectTrigger>
                  <SelectContent>
                    {toolMonitorRules?.toolMonitorRules.map(
                      (toolMonitorRule) => (
                        <SelectItem
                          key={toolMonitorRule.id}
                          value={toolMonitorRule.id.toString()}
                        >
                          {toolMonitorRule.id}{" "}
                          {/* TODO: Replace with a field from the toolMonitorRule model */}
                        </SelectItem>
                      ),
                    )}
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
            onClick={() =>
              deleteToolMonitorSubscription({ id: toolMonitorSubscription.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolMonitorSubscriptionForm;
