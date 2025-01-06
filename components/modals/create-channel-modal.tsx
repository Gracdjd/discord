"use client";
import qs from "query-string";
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "../ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "channel name is required",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general",
    }),
  type: z.nativeEnum(ChannelType),
});

const CreateChannelModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createChannel";
  const router = useRouter();
  const params = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      });
      console.log(url);
      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };
  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl text-center font-bold">
              Create Your Channel
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
                        Channel Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter server name"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Channel Type</FormLabel>

                      <FormControl>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className="bg-zinc-300/50 border-0 text-black
                          focus:ring-0 ring-offset-0 focus:ring-offset-0 
                          capitalize "
                          >
                            <SelectValue placeholder="Select a channel type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ChannelType).map((type) => {
                              return (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  className="capitalize"
                                >
                                  {type.toLowerCase()}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                          <FormMessage />
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button variant="primary" disabled={isLoading}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChannelModal;
