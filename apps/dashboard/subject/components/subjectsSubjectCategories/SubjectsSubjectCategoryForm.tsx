"use client";

import { SubjectsSubjectCategory, NewSubjectsSubjectCategoryParams, insertSubjectsSubjectCategoryParams } from "@soco/subject-db/schema/subjectsSubjectCategories";
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

const SubjectsSubjectCategoryForm = ({
  subjectsSubjectCategory,
  closeModal,
}: {
  subjectsSubjectCategory?: SubjectsSubjectCategory;
  closeModal?: () => void;
}) => {
  const { data: subjectCategories } = trpc.subjectCategories.getSubjectCategories.useQuery();
  const { data: subjects } = trpc.subjects.getSubjects.useQuery();
  const editing = !!subjectsSubjectCategory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSubjectsSubjectCategoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSubjectsSubjectCategoryParams),
    defaultValues: subjectsSubjectCategory ?? {
      subjectCategoryId: "",
     subjectId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.subjectsSubjectCategories.getSubjectsSubjectCategories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Subjects Subject Category ${action}d!`);
  };

  const { mutate: createSubjectsSubjectCategory, isLoading: isCreating } =
    trpc.subjectsSubjectCategories.createSubjectsSubjectCategory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSubjectsSubjectCategory, isLoading: isUpdating } =
    trpc.subjectsSubjectCategories.updateSubjectsSubjectCategory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSubjectsSubjectCategory, isLoading: isDeleting } =
    trpc.subjectsSubjectCategories.deleteSubjectsSubjectCategory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSubjectsSubjectCategoryParams) => {
    if (editing) {
      updateSubjectsSubjectCategory({ ...values, id: subjectsSubjectCategory.id });
    } else {
      createSubjectsSubjectCategory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="subjectCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Subject Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectCategories?.subjectCategories.map((subjectCategory) => (
                      <SelectItem key={subjectCategory.id} value={subjectCategory.id.toString()}>
                        {subjectCategory.id}  {/* TODO: Replace with a field from the subjectCategory model */}
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
          name="subjectId"
          render={({ field }) => (<FormItem>
              <FormLabel>Subject Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects?.subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.id}  {/* TODO: Replace with a field from the subject model */}
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
            onClick={() => deleteSubjectsSubjectCategory({ id: subjectsSubjectCategory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SubjectsSubjectCategoryForm;
