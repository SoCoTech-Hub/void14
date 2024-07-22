"use client";

import { MnetSession, NewMnetSessionParams, insertMnetSessionParams } from "@soco/mnet-db/schema/mnetSessions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@soco/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MnetSessionForm = ({
  mnetSession,
  closeModal,
}: {
  mnetSession?: MnetSession;
  closeModal?: () => void;
}) => {
  const { data: mnetHosts } = trpc.mnetHosts.getMnetHosts.useQuery();
  const editing = !!mnetSession?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetSessionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetSessionParams),
    defaultValues: mnetSession ?? {
      confirmTimeout: 0,
     expires: 0,
     mnetHostId: "",
     sessionId: "",
     token: "",
     userAgent: "",
     username: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetSessions.getMnetSessions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Session ${action}d!`);
  };

  const { mutate: createMnetSession, isLoading: isCreating } =
    trpc.mnetSessions.createMnetSession.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetSession, isLoading: isUpdating } =
    trpc.mnetSessions.updateMnetSession.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetSession, isLoading: isDeleting } =
    trpc.mnetSessions.deleteMnetSession.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetSessionParams) => {
    if (editing) {
      updateMnetSession({ ...values, id: mnetSession.id });
    } else {
      createMnetSession(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="confirmTimeout"
          render={({ field }) => (<FormItem>
              <FormLabel>Confirm Timeout</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expires"
          render={({ field }) => (<FormItem>
              <FormLabel>Expires</FormLabel>
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
          name="sessionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Session Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (<FormItem>
              <FormLabel>Token</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userAgent"
          render={({ field }) => (<FormItem>
              <FormLabel>User Agent</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (<FormItem>
              <FormLabel>Username</FormLabel>
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
            onClick={() => deleteMnetSession({ id: mnetSession.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetSessionForm;
