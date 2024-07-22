"use client";

import { BursaryCategoriesBursary, NewBursaryCategoriesBursaryParams, insertBursaryCategoriesBursaryParams } from "@soco/bursaries-db/schema/bursaryCategoriesBursaries";
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

const BursaryCategoriesBursaryForm = ({
  bursaryCategoriesBursary,
  closeModal,
}: {
  bursaryCategoriesBursary?: BursaryCategoriesBursary;
  closeModal?: () => void;
}) => {
  const { data: bursaries } = trpc.bursaries.getBursaries.useQuery();
  const { data: bursaryCategories } = trpc.bursaryCategories.getBursaryCategories.useQuery();
  const editing = !!bursaryCategoriesBursary?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertBursaryCategoriesBursaryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertBursaryCategoriesBursaryParams),
    defaultValues: bursaryCategoriesBursary ?? {
      bursaryId: "",
     bursaryCategoryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.bursaryCategoriesBursaries.getBursaryCategoriesBursaries.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Bursary Categories Bursary ${action}d!`);
  };

  const { mutate: createBursaryCategoriesBursary, isLoading: isCreating } =
    trpc.bursaryCategoriesBursaries.createBursaryCategoriesBursary.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateBursaryCategoriesBursary, isLoading: isUpdating } =
    trpc.bursaryCategoriesBursaries.updateBursaryCategoriesBursary.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteBursaryCategoriesBursary, isLoading: isDeleting } =
    trpc.bursaryCategoriesBursaries.deleteBursaryCategoriesBursary.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewBursaryCategoriesBursaryParams) => {
    if (editing) {
      updateBursaryCategoriesBursary({ ...values, id: bursaryCategoriesBursary.id });
    } else {
      createBursaryCategoriesBursary(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="bursaryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Bursary Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bursary" />
                  </SelectTrigger>
                  <SelectContent>
                    {bursaries?.bursaries.map((bursary) => (
                      <SelectItem key={bursary.id} value={bursary.id.toString()}>
                        {bursary.id}  {/* TODO: Replace with a field from the bursary model */}
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
          name="bursaryCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Bursary Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bursary category" />
                  </SelectTrigger>
                  <SelectContent>
                    {bursaryCategories?.bursaryCategories.map((bursaryCategory) => (
                      <SelectItem key={bursaryCategory.id} value={bursaryCategory.id.toString()}>
                        {bursaryCategory.id}  {/* TODO: Replace with a field from the bursaryCategory model */}
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
            onClick={() => deleteBursaryCategoriesBursary({ id: bursaryCategoriesBursary.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default BursaryCategoriesBursaryForm;
