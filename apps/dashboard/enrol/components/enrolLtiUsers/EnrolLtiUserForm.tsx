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
  EnrolLtiUser,
  insertEnrolLtiUserParams,
  NewEnrolLtiUserParams,
} from "@soco/enrol-db/schema/enrolLtiUsers";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const EnrolLtiUserForm = ({
  enrolLtiUser,
  closeModal,
}: {
  enrolLtiUser?: EnrolLtiUser;
  closeModal?: () => void;
}) => {
  const { data: enrolLtiDeployments } =
    trpc.enrolLtiDeployments.getEnrolLtiDeployments.useQuery();
  const editing = !!enrolLtiUser?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiUserParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiUserParams),
    defaultValues: enrolLtiUser ?? {
      consumerKey: "",
      consumerSecret: "",
      lastAccess: "",
      lastGrade: 0.0,
      enrolLtiDeploymentId: "",
      membershipsId: "",
      membershipsUrl: "",
      serviceUrl: "",
      sourceId: "",
      toolId: "",
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

    await utils.enrolLtiUsers.getEnrolLtiUsers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Enrol Lti User ${action}d!`);
  };

  const { mutate: createEnrolLtiUser, isLoading: isCreating } =
    trpc.enrolLtiUsers.createEnrolLtiUser.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiUser, isLoading: isUpdating } =
    trpc.enrolLtiUsers.updateEnrolLtiUser.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiUser, isLoading: isDeleting } =
    trpc.enrolLtiUsers.deleteEnrolLtiUser.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiUserParams) => {
    if (editing) {
      updateEnrolLtiUser({ ...values, id: enrolLtiUser.id });
    } else {
      createEnrolLtiUser(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="consumerKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consumer Key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consumerSecret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consumer Secret</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Access</FormLabel>
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
          name="lastGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Grade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enrolLtiDeploymentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrol Lti Deployment Id</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a enrol lti deployment" />
                  </SelectTrigger>
                  <SelectContent>
                    {enrolLtiDeployments?.enrolLtiDeployments.map(
                      (enrolLtiDeployment) => (
                        <SelectItem
                          key={enrolLtiDeployment.id}
                          value={enrolLtiDeployment.id.toString()}
                        >
                          {enrolLtiDeployment.id}{" "}
                          {/* TODO: Replace with a field from the enrolLtiDeployment model */}
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
        <FormField
          control={form.control}
          name="membershipsId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memberships Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="membershipsUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memberships Url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sourceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toolId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool Id</FormLabel>
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
            onClick={() => deleteEnrolLtiUser({ id: enrolLtiUser.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiUserForm;
