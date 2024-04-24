"use client";

import { QualificationsResponse, NewQualificationsResponseParams, insertQualificationsResponseParams } from "@/lib/db/schema/qualificationsResponses";
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

const QualificationsResponseForm = ({
  qualificationsResponse,
  closeModal,
}: {
  qualificationsResponse?: QualificationsResponse;
  closeModal?: () => void;
}) => {
  const { data: qualifications } = trpc.qualifications.getQualifications.useQuery();
  const editing = !!qualificationsResponse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQualificationsResponseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQualificationsResponseParams),
    defaultValues: qualificationsResponse ?? {
      isSaved: false,
     applied: false,
     qualificationId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qualificationsResponses.getQualificationsResponses.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qualifications Response ${action}d!`);
  };

  const { mutate: createQualificationsResponse, isLoading: isCreating } =
    trpc.qualificationsResponses.createQualificationsResponse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQualificationsResponse, isLoading: isUpdating } =
    trpc.qualificationsResponses.updateQualificationsResponse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQualificationsResponse, isLoading: isDeleting } =
    trpc.qualificationsResponses.deleteQualificationsResponse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQualificationsResponseParams) => {
    if (editing) {
      updateQualificationsResponse({ ...values, id: qualificationsResponse.id });
    } else {
      createQualificationsResponse(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="isSaved"
          render={({ field }) => (<FormItem>
              <FormLabel>Is Saved</FormLabel>
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
          name="applied"
          render={({ field }) => (<FormItem>
              <FormLabel>Applied</FormLabel>
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
          name="qualificationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Qualification Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualifications?.qualifications.map((qualification) => (
                      <SelectItem key={qualification.id} value={qualification.id.toString()}>
                        {qualification.name}  {/* TODO: Replace with a field from the qualification model */}
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
            onClick={() => deleteQualificationsResponse({ id: qualificationsResponse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QualificationsResponseForm;
