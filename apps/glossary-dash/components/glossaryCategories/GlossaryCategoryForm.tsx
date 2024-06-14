"use client";

import { GlossaryCategory, NewGlossaryCategoryParams, insertGlossaryCategoryParams } from "@/lib/db/schema/glossaryCategories";
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

const GlossaryCategoryForm = ({
  glossaryCategory,
  closeModal,
}: {
  glossaryCategory?: GlossaryCategory;
  closeModal?: () => void;
}) => {
  const { data: glossaries } = trpc.glossaries.getGlossaries.useQuery();
  const editing = !!glossaryCategory?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGlossaryCategoryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGlossaryCategoryParams),
    defaultValues: glossaryCategory ?? {
      glossaryId: "",
     name: "",
     useDynaLink: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.glossaryCategories.getGlossaryCategories.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Glossary Category ${action}d!`);
  };

  const { mutate: createGlossaryCategory, isLoading: isCreating } =
    trpc.glossaryCategories.createGlossaryCategory.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGlossaryCategory, isLoading: isUpdating } =
    trpc.glossaryCategories.updateGlossaryCategory.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGlossaryCategory, isLoading: isDeleting } =
    trpc.glossaryCategories.deleteGlossaryCategory.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGlossaryCategoryParams) => {
    if (editing) {
      updateGlossaryCategory({ ...values, id: glossaryCategory.id });
    } else {
      createGlossaryCategory(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="glossaryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Glossary Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a glossary" />
                  </SelectTrigger>
                  <SelectContent>
                    {glossaries?.glossaries.map((glossary) => (
                      <SelectItem key={glossary.id} value={glossary.id.toString()}>
                        {glossary.id}  {/* TODO: Replace with a field from the glossary model */}
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
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="useDynaLink"
          render={({ field }) => (<FormItem>
              <FormLabel>Use Dyna Link</FormLabel>
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
            onClick={() => deleteGlossaryCategory({ id: glossaryCategory.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GlossaryCategoryForm;
