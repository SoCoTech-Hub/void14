"use client";

import { Digilib, NewDigilibParams, insertDigilibParams } from "@/lib/db/schema/digilibs";
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

const DigilibForm = ({
  digilib,
  closeModal,
}: {
  digilib?: Digilib;
  closeModal?: () => void;
}) => {
  const { data: digilibCategories } = trpc.digilibCategories.getDigilibCategories.useQuery();
  const editing = !!digilib?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertDigilibParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDigilibParams),
    defaultValues: digilib ?? {
      name: "",
     estimatedReadingTime: 0,
     releaseYear: 0,
     link: "",
     language: "",
     isDownloadable: false,
     attachment: "",
     digilibCategoryId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.digilibs.getDigilibs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Digilib ${action}d!`);
  };

  const { mutate: createDigilib, isLoading: isCreating } =
    trpc.digilibs.createDigilib.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateDigilib, isLoading: isUpdating } =
    trpc.digilibs.updateDigilib.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteDigilib, isLoading: isDeleting } =
    trpc.digilibs.deleteDigilib.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewDigilibParams) => {
    if (editing) {
      updateDigilib({ ...values, id: digilib.id });
    } else {
      createDigilib(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="estimatedReadingTime"
          render={({ field }) => (<FormItem>
              <FormLabel>Estimated Reading Time</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (<FormItem>
              <FormLabel>Release Year</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (<FormItem>
              <FormLabel>Link</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (<FormItem>
              <FormLabel>Language</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDownloadable"
          render={({ field }) => (<FormItem>
              <FormLabel>Is Downloadable</FormLabel>
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
          name="attachment"
          render={({ field }) => (<FormItem>
              <FormLabel>Attachment</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="digilibCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Digilib Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a digilib category" />
                  </SelectTrigger>
                  <SelectContent>
                    {digilibCategories?.digilibCategories.map((digilibCategory) => (
                      <SelectItem key={digilibCategory.id} value={digilibCategory.id.toString()}>
                        {digilibCategory.name}  {/* TODO: Replace with a field from the digilibCategory model */}
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
            onClick={() => deleteDigilib({ id: digilib.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default DigilibForm;
