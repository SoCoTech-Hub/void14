"use client";

import { MessageAirnotifierDevice, NewMessageAirnotifierDeviceParams, insertMessageAirnotifierDeviceParams } from "@soco/message-db/schema/messageAirnotifierDevices";
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

const MessageAirnotifierDeviceForm = ({
  messageAirnotifierDevice,
  closeModal,
}: {
  messageAirnotifierDevice?: MessageAirnotifierDevice;
  closeModal?: () => void;
}) => {
  
  const editing = !!messageAirnotifierDevice?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMessageAirnotifierDeviceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMessageAirnotifierDeviceParams),
    defaultValues: messageAirnotifierDevice ?? {
      enable: false,
     userDeviceId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.messageAirnotifierDevices.getMessageAirnotifierDevices.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Message Airnotifier Device ${action}d!`);
  };

  const { mutate: createMessageAirnotifierDevice, isLoading: isCreating } =
    trpc.messageAirnotifierDevices.createMessageAirnotifierDevice.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMessageAirnotifierDevice, isLoading: isUpdating } =
    trpc.messageAirnotifierDevices.updateMessageAirnotifierDevice.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMessageAirnotifierDevice, isLoading: isDeleting } =
    trpc.messageAirnotifierDevices.deleteMessageAirnotifierDevice.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMessageAirnotifierDeviceParams) => {
    if (editing) {
      updateMessageAirnotifierDevice({ ...values, id: messageAirnotifierDevice.id });
    } else {
      createMessageAirnotifierDevice(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="enable"
          render={({ field }) => (<FormItem>
              <FormLabel>Enable</FormLabel>
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
          name="userDeviceId"
          render={({ field }) => (<FormItem>
              <FormLabel>User Device Id</FormLabel>
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
            onClick={() => deleteMessageAirnotifierDevice({ id: messageAirnotifierDevice.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MessageAirnotifierDeviceForm;
