"use client";

import { useRouter } from "next/navigation";
import { Button } from "@soco/ui/button";
import { Calendar } from "@soco/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@soco/ui/popover";
import {
  insertStatsUserWeeklyParams,
  NewStatsUserWeeklyParams,
  StatsUserWeekly,
} from "@soco/stats-db/schema/statsUserWeeklies";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const StatsUserWeeklyForm = ({
  statsUserWeekly,
  closeModal,
}: {
  statsUserWeekly?: StatsUserWeekly;
  closeModal?: () => void;
}) => {
  const editing = !!statsUserWeekly?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertStatsUserWeeklyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertStatsUserWeeklyParams),
    defaultValues: statsUserWeekly ?? {
      courseId: "",
      roleId: "",
      statsReads: "",
      statsWrites: "",
      statType: "",
      timeEnd: "",
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

    await utils.statsUserWeeklies.getStatsUserWeeklies.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Stats User Weekly ${action}d!`);
  };

  const { mutate: createStatsUserWeekly, isLoading: isCreating } =
    trpc.statsUserWeeklies.createStatsUserWeekly.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateStatsUserWeekly, isLoading: isUpdating } =
    trpc.statsUserWeeklies.updateStatsUserWeekly.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteStatsUserWeekly, isLoading: isDeleting } =
    trpc.statsUserWeeklies.deleteStatsUserWeekly.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewStatsUserWeeklyParams) => {
    if (editing) {
      updateStatsUserWeekly({ ...values, id: statsUserWeekly.id });
    } else {
      createStatsUserWeekly(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statsReads"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stats Reads</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statsWrites"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stats Writes</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stat Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time End</FormLabel>
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
            onClick={() => deleteStatsUserWeekly({ id: statsUserWeekly.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default StatsUserWeeklyForm;
