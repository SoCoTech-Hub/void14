"use client";

import { H5pLibrary, NewH5pLibraryParams, insertH5pLibraryParams } from "@soco/h5p-db/schema/h5pLibraries";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const H5pLibraryForm = ({
  h5pLibrary,
  closeModal,
}: {
  h5pLibrary?: H5pLibrary;
  closeModal?: () => void;
}) => {
  
  const editing = !!h5pLibrary?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pLibraryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pLibraryParams),
    defaultValues: h5pLibrary ?? {
      embedTypes: "",
     addTo: "",
     coreMajor: 0,
     coreMinor: 0,
     dropLibraryCss: "",
     enabled: false,
     example: "",
     fullScreen: false,
     machineName: "",
     majorVersion: 0,
     metaDataSettings: "",
     minorVersion: 0,
     patchVersion: 0,
     preLoadedCss: "",
     preLoadedJs: "",
     runnable: false,
     semantics: "",
     title: "",
     tutorial: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pLibraries.getH5pLibraries.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5p Library ${action}d!`);
  };

  const { mutate: createH5pLibrary, isLoading: isCreating } =
    trpc.h5pLibraries.createH5pLibrary.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pLibrary, isLoading: isUpdating } =
    trpc.h5pLibraries.updateH5pLibrary.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pLibrary, isLoading: isDeleting } =
    trpc.h5pLibraries.deleteH5pLibrary.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pLibraryParams) => {
    if (editing) {
      updateH5pLibrary({ ...values, id: h5pLibrary.id });
    } else {
      createH5pLibrary(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="embedTypes"
          render={({ field }) => (<FormItem>
              <FormLabel>Embed Types</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addTo"
          render={({ field }) => (<FormItem>
              <FormLabel>Add To</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coreMajor"
          render={({ field }) => (<FormItem>
              <FormLabel>Core Major</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coreMinor"
          render={({ field }) => (<FormItem>
              <FormLabel>Core Minor</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropLibraryCss"
          render={({ field }) => (<FormItem>
              <FormLabel>Drop Library Css</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (<FormItem>
              <FormLabel>Enabled</FormLabel>
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
          name="example"
          render={({ field }) => (<FormItem>
              <FormLabel>Example</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullScreen"
          render={({ field }) => (<FormItem>
              <FormLabel>Full Screen</FormLabel>
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
          name="machineName"
          render={({ field }) => (<FormItem>
              <FormLabel>Machine Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="majorVersion"
          render={({ field }) => (<FormItem>
              <FormLabel>Major Version</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaDataSettings"
          render={({ field }) => (<FormItem>
              <FormLabel>Meta Data Settings</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minorVersion"
          render={({ field }) => (<FormItem>
              <FormLabel>Minor Version</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patchVersion"
          render={({ field }) => (<FormItem>
              <FormLabel>Patch Version</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preLoadedCss"
          render={({ field }) => (<FormItem>
              <FormLabel>Pre Loaded Css</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preLoadedJs"
          render={({ field }) => (<FormItem>
              <FormLabel>Pre Loaded Js</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="runnable"
          render={({ field }) => (<FormItem>
              <FormLabel>Runnable</FormLabel>
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
          name="semantics"
          render={({ field }) => (<FormItem>
              <FormLabel>Semantics</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (<FormItem>
              <FormLabel>Title</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tutorial"
          render={({ field }) => (<FormItem>
              <FormLabel>Tutorial</FormLabel>
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
            onClick={() => deleteH5pLibrary({ id: h5pLibrary.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pLibraryForm;
