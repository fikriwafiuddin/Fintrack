import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquareTextIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { feedbackValidation } from "@/lib/validations/feedback-validation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { FormDataFeedback } from "@/types"

function FeedbackPage() {
  const form = useForm({ resolver: zodResolver(feedbackValidation.create) })

  const onSubmit = (data: FormDataFeedback) => {
    console.log("Feedback submitted:", data)
  }

  return (
    <div className="space-y-8 pt-2">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquareTextIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Kritik & Saran</CardTitle>
              <CardDescription>
                Bantu kami meningkatkan aplikasi dengan feedback Anda
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter feedback subject" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter feedback message"
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                // onClick={handleSubmitFeedback}
                // disabled={isSubmittingFeedback || !feedbackSubject.trim() || !feedbackMessage.trim()}
                className="w-full sm:w-auto"
              >
                Send
                {/* {isSubmittingFeedback ? 'Mengirim...' : 'Kirim Feedback'} */}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeedbackPage
