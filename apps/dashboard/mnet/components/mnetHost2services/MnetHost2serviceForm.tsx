"use client";

import { MnetHost2service, NewMnetHost2serviceParams, insertMnetHost2serviceParams } from "@soco/mnet-db/schema/mnetHost2services";
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
import { Checkbox } from "@soco/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MnetHost2serviceForm = ({
  mnetHost2service,
  closeModal,
}: {
  mnetHost2service?: MnetHost2service;
  closeModal?: () => void;
}) => {
  const { data: mnetHosts } = trpc.mnetHosts.getMnetHosts.useQuery();
  const { data: mnetServices } = trpc.mnetServices.getMnetServices.useQuery();
  const editing = !!mnetHost2service?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertMnetHost2serviceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertMnetHost2serviceParams),
    defaultValues: mnetHost2service ?? {
      mnetHostId: "",
     mnetServiceId: "",
     publish: false,
     subscribe: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.mnetHost2services.getMnetHost2services.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Mnet Host2service ${action}d!`);
  };

  const { mutate: createMnetHost2service, isLoading: isCreating } =
    trpc.mnetHost2services.createMnetHost2service.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateMnetHost2service, isLoading: isUpdating } =
    trpc.mnetHost2services.updateMnetHost2service.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteMnetHost2service, isLoading: isDeleting } =
    trpc.mnetHost2services.deleteMnetHost2service.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewMnetHost2serviceParams) => {
    if (editing) {
      updateMnetHost2service({ ...values, id: mnetHost2service.id });
    } else {
      createMnetHost2service(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="mnetServiceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Mnet Service Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mnet service" />
                  </SelectTrigger>
                  <SelectContent>
                    {mnetServices?.mnetServices.map((mnetService) => (
                      <SelectItem key={mnetService.id} value={mnetService.id.toString()}>
                        {mnetService.id}  {/* TODO: Replace with a field from the mnetService model */}
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
          name="publish"
          render={({ field }) => (<FormItem>
              <FormLabel>Publish</FormLabel>
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
          name="subscribe"
          render={({ field }) => (<FormItem>
              <FormLabel>Subscribe</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
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
            onClick={() => deleteMnetHost2service({ id: mnetHost2service.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default MnetHost2serviceForm;
