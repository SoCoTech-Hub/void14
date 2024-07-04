"use client";

import { MnetSsoAccessControl, NewMnetSsoAccessControlParams, insertMnetSsoAccessControlParams } from "@/lib/db/schema/mnetSsoAccessControls";
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

const MnetSsoAccessControlForm = ({
  mnetSsoAccessControl,
  closeModal,
}: {
  mnetSsoAccessControl?: MnetSsoAccessControl;
  closeModal?: () => void;
}) => {
  const { data: mnetHosts } = trpc.mnetHosts.getMnetHosts.useQuery();
  const editing = !!mnetSsoAccessControl?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetSsoAccessControlParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetSsoAccessControlParams),
    defaultValues: mnetSsoAccessControl ?? {
      accessCtrl: "",
     mnetHostId: "",
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

    await utils.mnetSsoAccessControls.getMnetSsoAccessControls.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Sso Access Control ${action}d!`);
  };

  const { mutate: createMnetSsoAccessControl, isLoading: isCreating } =
    trpc.mnetSsoAccessControls.createMnetSsoAccessControl.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetSsoAccessControl, isLoading: isUpdating } =
    trpc.mnetSsoAccessControls.updateMnetSsoAccessControl.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetSsoAccessControl, isLoading: isDeleting } =
    trpc.mnetSsoAccessControls.deleteMnetSsoAccessControl.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetSsoAccessControlParams) => {
    if (editing) {
      updateMnetSsoAccessControl({ ...values, id: mnetSsoAccessControl.id });
    } else {
      createMnetSsoAccessControl(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="accessCtrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Access Ctrl</FormLabel>
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
            onClick={() => deleteMnetSsoAccessControl({ id: mnetSsoAccessControl.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetSsoAccessControlForm;