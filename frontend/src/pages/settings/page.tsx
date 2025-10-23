import CurrencyFormatter from "@/components/CurrencyFormatter"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import settingValidation from "@/lib/validations/setting-validation"
import { useUpdateUserPreference } from "@/services/hooks/settingHook"
import { useUserPreference } from "@/store/useUserPreference"
import type { FormDataSetting } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, DollarSignIcon, Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"

interface Currency {
  code: string
  symbol: string
  name: string
}

const CURRENCIES: Currency[] = [
  { code: "IDR", symbol: "Rp", name: "Rupiah Indonesia" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
]

function SettingsPage() {
  const currencyCode = useUserPreference((state) => state.currencyCode)
  const form = useForm({
    resolver: zodResolver(settingValidation.update),
    defaultValues: {
      currency: currencyCode || "IDR",
    },
  })
  const { isPending: saving, mutate: save } = useUpdateUserPreference()
  const currency = form.watch("currency")

  const onSubmit = (data: FormDataSetting) => {
    save(data)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSignIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Currency</CardTitle>
              <CardDescription>
                Select the currency to be used in the application
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2 block">
                          Choose Currency
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {CURRENCIES.map((curr) => (
                              <SelectItem key={curr.code} value={curr.code}>
                                <div className="flex items-center">
                                  <span className="font-mono mr-2">
                                    {curr.symbol}
                                  </span>
                                  <span>{curr.name}</span>
                                  <span className="ml-2 text-muted-foreground">
                                    ({curr.code})
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Example Format:
                  </p>
                  <p className="text-2xl font-bold">
                    <CurrencyFormatter amount={100000} />
                  </p>
                </div>

                <Button
                  disabled={saving || currencyCode === currency}
                  className="w-full sm:w-auto"
                >
                  {saving ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <>
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="space-y-2 list-disc list-inside">
            <li>Currency changes will be applied to all value displays.</li>
            <li>Your transaction data will not be affected</li>
            <li>This setting only changes how the currency is displayed.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
