"use client";

import { GroupingsGroup, NewGroupingsGroupParams, insertGroupingsGroupParams } from "@/lib/db/schema/groupingsGroups";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GroupingsGroupForm = ({
  groupingsGroup,
  closeModal,
}: {
  groupingsGroup?: GroupingsGroup;
  closeModal?: () => void;
}) => {
  const { data: groupings } = trpc.groupings.getGroupings.useQuery();
  const { data: groups } = trpc.groups.getGroups.useQuery();
  const editing = !!groupingsGroup?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGroupingsGroupParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGroupingsGroupParams),
    defaultValues: groupingsGroup ?? {
      groupingId: "",
     groupId: "",
     timeAdded: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.groupingsGroups.getGroupingsGroups.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Groupings Group ${action}d!`);
  };

  const { mutate: createGroupingsGroup, isLoading: isCreating } =
    trpc.groupingsGroups.createGroupingsGroup.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGroupingsGroup, isLoading: isUpdating } =
    trpc.groupingsGroups.updateGroupingsGroup.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGroupingsGroup, isLoading: isDeleting } =
    trpc.groupingsGroups.deleteGroupingsGroup.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGroupingsGroupParams) => {
    if (editing) {
      updateGroupingsGroup({ ...values, id: groupingsGroup.id });
    } else {
      createGroupingsGroup(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="groupingId"
          render={({ field }) => (<FormItem>
              <FormLabel>Grouping Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grouping" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupings?.groupings.map((grouping) => (
                      <SelectItem key={grouping.id} value={grouping.id.toString()}>
                        {grouping.id}  {/* TODO: Replace with a field from the grouping model */}
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
          name="groupId"
          render={({ field }) => (<FormItem>
              <FormLabel>Group Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups?.groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.id}  {/* TODO: Replace with a field from the group model */}
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
          name="timeAdded"
          render={({ field }) => (<FormItem>
              <FormLabel>Time Added</FormLabel>
                <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
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
            onClick={() => deleteGroupingsGroup({ id: groupingsGroup.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GroupingsGroupForm;
