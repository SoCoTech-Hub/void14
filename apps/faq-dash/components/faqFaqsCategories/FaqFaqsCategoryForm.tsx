"use client";

import { FaqFaqsCategory, NewFaqFaqsCategoryParams, insertFaqFaqsCategoryParams } from "@/lib/db/schema/faqFaqsCategories";
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

const FaqFaqsCategoryForm = ({
  faqFaqsCategory,
  closeModal,
}: {
  faqFaqsCategory?: FaqFaqsCategory;
  closeModal?: () => void;
}) => {
  const { data: faqCategories } = trpc.faqCategories.getFaqCategories.useQuery();
  const { data: faqs } = trpc.faqs.getFaqs.useQuery();
  const editing = !!faqFaqsCategory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFaqFaqsCategoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFaqFaqsCategoryParams),
    defaultValues: faqFaqsCategory ?? {
      faqCategoryId: "",
     faqId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.faqFaqsCategories.getFaqFaqsCategories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Faq Faqs Category ${action}d!`);
  };

  const { mutate: createFaqFaqsCategory, isLoading: isCreating } =
    trpc.faqFaqsCategories.createFaqFaqsCategory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateFaqFaqsCategory, isLoading: isUpdating } =
    trpc.faqFaqsCategories.updateFaqFaqsCategory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteFaqFaqsCategory, isLoading: isDeleting } =
    trpc.faqFaqsCategories.deleteFaqFaqsCategory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewFaqFaqsCategoryParams) => {
    if (editing) {
      updateFaqFaqsCategory({ ...values, id: faqFaqsCategory.id });
    } else {
      createFaqFaqsCategory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="faqCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Faq Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a faq category" />
                  </SelectTrigger>
                  <SelectContent>
                    {faqCategories?.faqCategories.map((faqCategory) => (
                      <SelectItem key={faqCategory.id} value={faqCategory.id.toString()}>
                        {faqCategory.id}  {/* TODO: Replace with a field from the faqCategory model */}
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
          name="faqId"
          render={({ field }) => (<FormItem>
              <FormLabel>Faq Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a faq" />
                  </SelectTrigger>
                  <SelectContent>
                    {faqs?.faqs.map((faq) => (
                      <SelectItem key={faq.id} value={faq.id.toString()}>
                        {faq.id}  {/* TODO: Replace with a field from the faq model */}
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
            onClick={() => deleteFaqFaqsCategory({ id: faqFaqsCategory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default FaqFaqsCategoryForm;
