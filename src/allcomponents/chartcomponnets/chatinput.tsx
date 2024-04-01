import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Plus, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Doc, getDoc, setDoc } from "@junobuild/core";
import { useLocation } from "react-router-dom";
const formSchema = z.object({
  content: z.string().min(1),
});
type Data = {
  info: any;
  messages: string[];
};
type already={
  messages:string[]
}
interface messageData{
  messages: string[]; 
}
export const ChatInput = () => {
  const loaction = useLocation();
  const queryParams = new URLSearchParams(loaction.search);
  const id: string = queryParams.get("key") ?? "";
  console.log(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    let fg: string[] = [];
    fg.push(value.content);
    console.log(fg, "st");

    //retrieve the document
    const myDoc = await getDoc({
      collection: "communities",
      key: id,
    });
    //retrieve the document from messgaes
    const messageDoc = await getDoc({
      collection: "messages",
      key: id,
    })as Doc<messageData>;
    const sendData: Data = {
      info: myDoc,
      messages: fg,
    };
    if (!messageDoc) {
      setDoc<Data>({
        collection: "messages",
        doc: {
          key: id,
          ...myDoc,
          data: sendData,
        },
      });
    }
    else{
      const Messages:string[]=messageDoc?.data.messages;
      Messages.push(value.content);
      const updateData:already={
        messages:Messages
      }
      setDoc<already>({
        collection: "messages",
        doc: {
          ...messageDoc,
          data: updateData,
        },
      });
    }

    console.log(myDoc);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="P-4 pb-6 relative">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-3 left-4 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600  transition rounded-full p-1 flex justify-center items-center "
                  >
                    <Plus className="text-white " />
                  </button>
                  <Input
                    disabled={isLoading}
                    placeholder="message"
                    {...field}
                    className="px-14 py-6 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 "
                  />
                  <div className="absolute top-3 right-4">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
