"use client";

import { JobApplicationsApplicationCategory, NewJobApplicationsApplicationCategoryParams, insertJobApplicationsApplicationCategoryParams } from "@soco/application-db/schema/jobApplicationsApplicationCategories";
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

const JobApplicationsApplicationCategoryForm = ({
  jobApplicationsApplicationCategory,
  closeModal,
}: {
  jobApplicationsApplicationCategory?: JobApplicationsApplicationCategory;
  closeModal?: () => void;
}) => {
  const { data: jobApplications } = trpc.jobApplications.getJobApplications.useQuery();
  const { data: applicationCategories } = trpc.applicationCategories.getApplicationCategories.useQuery();
  const editing = !!jobApplicationsApplicationCategory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertJobApplicationsApplicationCategoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertJobApplicationsApplicationCategoryParams),
    defaultValues: jobApplicationsApplicationCategory ?? {
      jobApplicationId: "",
     applicationCategoryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.jobApplicationsApplicationCategories.getJobApplicationsApplicationCategories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Job Applications Application Category ${action}d!`);
  };

  const { mutate: createJobApplicationsApplicationCategory, isLoading: isCreating } =
    trpc.jobApplicationsApplicationCategories.createJobApplicationsApplicationCategory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateJobApplicationsApplicationCategory, isLoading: isUpdating } =
    trpc.jobApplicationsApplicationCategories.updateJobApplicationsApplicationCategory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteJobApplicationsApplicationCategory, isLoading: isDeleting } =
    trpc.jobApplicationsApplicationCategories.deleteJobApplicationsApplicationCategory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewJobApplicationsApplicationCategoryParams) => {
    if (editing) {
      updateJobApplicationsApplicationCategory({ ...values, id: jobApplicationsApplicationCategory.id });
    } else {
      createJobApplicationsApplicationCategory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="jobApplicationId"
          render={({ field }) => (<FormItem>
              <FormLabel>Job Application Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job application" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobApplications?.jobApplications.map((jobApplication) => (
                      <SelectItem key={jobApplication.id} value={jobApplication.id.toString()}>
                        {jobApplication.id}  {/* TODO: Replace with a field from the jobApplication model */}
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
          name="applicationCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Application Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a application category" />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationCategories?.applicationCategories.map((applicationCategory) => (
                      <SelectItem key={applicationCategory.id} value={applicationCategory.id.toString()}>
                        {applicationCategory.id}  {/* TODO: Replace with a field from the applicationCategory model */}
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
            onClick={() => deleteJobApplicationsApplicationCategory({ id: jobApplicationsApplicationCategory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default JobApplicationsApplicationCategoryForm;
