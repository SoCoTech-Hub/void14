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
  EnrolLtiLti2ShareKey,
  insertEnrolLtiLti2ShareKeyParams,
  NewEnrolLtiLti2ShareKeyParams,
} from "@soco/enrol-db/schema/enrolLtiLti2ShareKeys";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const EnrolLtiLti2ShareKeyForm = ({
  enrolLtiLti2ShareKey,
  closeModal,
}: {
  enrolLtiLti2ShareKey?: EnrolLtiLti2ShareKey;
  closeModal?: () => void;
}) => {
  const editing = !!enrolLtiLti2ShareKey?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiLti2ShareKeyParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiLti2ShareKeyParams),
    defaultValues: enrolLtiLti2ShareKey ?? {
      autoApprove: false,
      expires: "",
      resourceLinkId: "",
      shareKey: "",
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

    await utils.enrolLtiLti2ShareKeys.getEnrolLtiLti2ShareKeys.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Enrol Lti Lti2 Share Key ${action}d!`);
  };

  const { mutate: createEnrolLtiLti2ShareKey, isLoading: isCreating } =
    trpc.enrolLtiLti2ShareKeys.createEnrolLtiLti2ShareKey.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiLti2ShareKey, isLoading: isUpdating } =
    trpc.enrolLtiLti2ShareKeys.updateEnrolLtiLti2ShareKey.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiLti2ShareKey, isLoading: isDeleting } =
    trpc.enrolLtiLti2ShareKeys.deleteEnrolLtiLti2ShareKey.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiLti2ShareKeyParams) => {
    if (editing) {
      updateEnrolLtiLti2ShareKey({ ...values, id: enrolLtiLti2ShareKey.id });
    } else {
      createEnrolLtiLti2ShareKey(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="autoApprove"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auto Approve</FormLabel>
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
          name="expires"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expires</FormLabel>
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
          name="resourceLinkId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource Link Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shareKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Share Key</FormLabel>
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
            onClick={() =>
              deleteEnrolLtiLti2ShareKey({ id: enrolLtiLti2ShareKey.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiLti2ShareKeyForm;
