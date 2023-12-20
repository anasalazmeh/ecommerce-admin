"use client";
import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formShema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message:"String must be a valid hex code."
  }),
});
type ColorFormValue = z.infer<typeof formShema>;

const ColorForm = ({ initialData }: { initialData: Color | null }) => {
  const form = useForm<ColorFormValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const params = useParams();
  const origin = useOrigin();
  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit color" : "Add a new color";
  const toastMessage = initialData ? "Color update" : "Color create";
  const actiov = initialData ? "save changes" : "Create";

  const onSubmit = async (data: ColorFormValue) => {
    try {
      setIsLoading(true);
      initialData
        ? await axios.patch(
            `/api/${params.storeId}/colors/${params.colorId}`,
            data
          )
        : await axios.post(`/api/${params.storeId}/colors`, data);
      route.push(`/${params.storeId}/colors`);
      route.refresh();
      toast.success(toastMessage);
    } catch (error) {
      setIsLoading(true);
      toast.error("Somethings went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      route.push(`/${params.storeId}/colors`);
      route.refresh();
      toast.success("Color Delete.");
    } catch (error) {
      toast.error("Make sure you  removed all products and colors first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setIsOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Color name"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Value</FormLabel>
                  <FormControl >
                    <Input
                      disabled={isLoading}
                      placeholder="Color value"
                      className=""
                      
                      {...field}
                    />
                  </FormControl>
                  <FormControl className="absolute top-7 right-2">
                    <Input
                      disabled={isLoading}
                      type="color"
                      {...field}
                      className="w-9 p-1 h-8 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {actiov}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ColorForm;
