"use client";

import { NotificationResponse, NewNotificationResponseParams, insertNotificationResponseParams } from "@/lib/db/schema/notificationResponses";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NotificationResponseForm = ({
  notificationResponse,
  closeModal,
}: {
  notificationResponse?: NotificationResponse;
  closeModal?: () => void;
}) => {
  const { data: notifications } = trpc.notifications.getNotifications.useQuery();
  const editing = !!notificationResponse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertNotificationResponseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertNotificationResponseParams),
    defaultValues: notificationResponse ?? {
      read: false,
     new: false,
     notificationId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.notificationResponses.getNotificationResponses.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Notification Response ${action}d!`);
  };

  const { mutate: createNotificationResponse, isLoading: isCreating } =
    trpc.notificationResponses.createNotificationResponse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateNotificationResponse, isLoading: isUpdating } =
    trpc.notificationResponses.updateNotificationResponse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteNotificationResponse, isLoading: isDeleting } =
    trpc.notificationResponses.deleteNotificationResponse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewNotificationResponseParams) => {
    if (editing) {
      updateNotificationResponse({ ...values, id: notificationResponse.id });
    } else {
      createNotificationResponse(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="read"
          render={({ field }) => (<FormItem>
              <FormLabel>Read</FormLabel>
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
          name="new"
          render={({ field }) => (<FormItem>
              <FormLabel>New</FormLabel>
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
          name="notificationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Notification Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a notification" />
                  </SelectTrigger>
                  <SelectContent>
                    {notifications?.notifications.map((notification) => (
                      <SelectItem key={notification.id} value={notification.id.toString()}>
                        {notification.name}  {/* TODO: Replace with a field from the notification model */}
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
            onClick={() => deleteNotificationResponse({ id: notificationResponse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default NotificationResponseForm;
