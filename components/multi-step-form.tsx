"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckCircle2, ChevronRight, Home, Building2, ExternalLink, PaintBucket } from "lucide-react"
import { FancyButton } from "@/components/ui/fancy-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Define the form schema
const formSchema = z.object({
  propertyType: z.enum(["home", "business"]),
  paintType: z.enum(["exterior", "interior", "both"]),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address1: z.string().min(5, { message: "Address is required" }),
  address2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Zip code is required" }),
  projectDetails: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const STEPS = [
  { id: "property", title: "Property Type" },
  { id: "paint", title: "Paint Type" },
  { id: "contact", title: "Contact Info" },
  { id: "address", title: "Property Address" },
  { id: "details", title: "Project Details" },
]

interface MultiStepFormProps {
  onClose?: () => void
}

export function MultiStepForm({ onClose }: MultiStepFormProps) {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "home",
      paintType: "exterior",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      projectDetails: "",
    },
  })

  const nextStep = () => {
    const fieldsToValidate = getFieldsForStep(step)

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        if (step < STEPS.length - 1) {
          setStep(step + 1)
        } else {
          handleSubmit()
        }
      }
    })
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const getFieldsForStep = (stepIndex: number): (keyof FormValues)[] => {
    switch (stepIndex) {
      case 0:
        return ["propertyType"]
      case 1:
        return ["paintType"]
      case 2:
        return ["firstName", "lastName", "email", "phone"]
      case 3:
        return ["address1", "city", "state", "zipCode"]
      case 4:
        return ["projectDetails"]
      default:
        return []
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your server
      // For now, we'll simulate a successful submission
      const formData = form.getValues()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted:", formData)

      // Email would be sent to info@nxgcoatingsinc.com with this data

      setIsSuccess(true)
      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you as soon as possible.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToCalendar = () => {
    window.open("https://cal.com/nxgcoatings/virtual-consultation", "_blank")
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2 uppercase">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          Your estimate request has been submitted successfully. Our team will contact you shortly.
        </p>
        <div className="space-y-4 w-full max-w-md">
          <FancyButton variant="accent" size="lg" className="w-full" onClick={goToCalendar}>
            Schedule a Consultation
            <ExternalLink className="ml-2 h-4 w-4" />
          </FancyButton>

          <FancyButton variant="outline" size="lg" className="w-full" onClick={onClose}>
            Close
          </FancyButton>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
                i < step
                  ? "bg-green-500 text-white"
                  : i === step
                    ? "bg-brand-blue text-white"
                    : "bg-gray-200 text-gray-500 dark:bg-gray-700"
              }`}
            >
              {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
            </div>
            <span className="text-xs mt-1 hidden md:block">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[300px]">
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium uppercase">What type of property needs painting?</h3>
            <RadioGroup
              value={form.watch("propertyType")}
              onValueChange={(value) => form.setValue("propertyType", value as "home" | "business")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="home" id="home" className="peer sr-only" />
                <Label
                  htmlFor="home"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-red [&:has([data-state=checked])]:border-brand-red"
                >
                  <Home className="mb-3 h-6 w-6" />
                  Home
                </Label>
              </div>
              <div>
                <RadioGroupItem value="business" id="business" className="peer sr-only" />
                <Label
                  htmlFor="business"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-red [&:has([data-state=checked])]:border-brand-red"
                >
                  <Building2 className="mb-3 h-6 w-6" />
                  Business
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium uppercase">What would you like to paint?</h3>
            <RadioGroup
              value={form.watch("paintType")}
              onValueChange={(value) => form.setValue("paintType", value as "exterior" | "interior" | "both")}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="exterior" id="exterior" className="peer sr-only" />
                <Label
                  htmlFor="exterior"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-red [&:has([data-state=checked])]:border-brand-red"
                >
                  <PaintBucket className="mb-3 h-6 w-6" />
                  Exterior
                </Label>
              </div>
              <div>
                <RadioGroupItem value="interior" id="interior" className="peer sr-only" />
                <Label
                  htmlFor="interior"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-red [&:has([data-state=checked])]:border-brand-red"
                >
                  <PaintBucket className="mb-3 h-6 w-6" />
                  Interior
                </Label>
              </div>
              <div>
                <RadioGroupItem value="both" id="both" className="peer sr-only" />
                <Label
                  htmlFor="both"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-red [&:has([data-state=checked])]:border-brand-red"
                >
                  <PaintBucket className="mb-3 h-6 w-6" />
                  Both
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium uppercase">Your Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...form.register("firstName")} placeholder="John" />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...form.register("lastName")} placeholder="Doe" />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...form.register("email")} placeholder="john.doe@example.com" />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" {...form.register("phone")} placeholder="(555) 123-4567" />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium uppercase">Property you want an estimate for</h3>
            <div className="space-y-2">
              <Label htmlFor="address1">Address 1 *</Label>
              <Input id="address1" {...form.register("address1")} placeholder="123 Main St" />
              {form.formState.errors.address1 && (
                <p className="text-sm text-red-500">{form.formState.errors.address1.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address2">Address 2</Label>
              <Input id="address2" {...form.register("address2")} placeholder="Apt 4B" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" {...form.register("city")} placeholder="New York" />
                {form.formState.errors.city && (
                  <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => form.setValue("state", value)} defaultValue={form.watch("state")}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select a State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="AR">Arkansas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="CT">Connecticut</SelectItem>
                    <SelectItem value="DE">Delaware</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="HI">Hawaii</SelectItem>
                    <SelectItem value="ID">Idaho</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="IN">Indiana</SelectItem>
                    <SelectItem value="IA">Iowa</SelectItem>
                    <SelectItem value="KS">Kansas</SelectItem>
                    <SelectItem value="KY">Kentucky</SelectItem>
                    <SelectItem value="LA">Louisiana</SelectItem>
                    <SelectItem value="ME">Maine</SelectItem>
                    <SelectItem value="MD">Maryland</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                    <SelectItem value="MN">Minnesota</SelectItem>
                    <SelectItem value="MS">Mississippi</SelectItem>
                    <SelectItem value="MO">Missouri</SelectItem>
                    <SelectItem value="MT">Montana</SelectItem>
                    <SelectItem value="NE">Nebraska</SelectItem>
                    <SelectItem value="NV">Nevada</SelectItem>
                    <SelectItem value="NH">New Hampshire</SelectItem>
                    <SelectItem value="NJ">New Jersey</SelectItem>
                    <SelectItem value="NM">New Mexico</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="NC">North Carolina</SelectItem>
                    <SelectItem value="ND">North Dakota</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="OK">Oklahoma</SelectItem>
                    <SelectItem value="OR">Oregon</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="RI">Rhode Island</SelectItem>
                    <SelectItem value="SC">South Carolina</SelectItem>
                    <SelectItem value="SD">South Dakota</SelectItem>
                    <SelectItem value="TN">Tennessee</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="UT">Utah</SelectItem>
                    <SelectItem value="VT">Vermont</SelectItem>
                    <SelectItem value="VA">Virginia</SelectItem>
                    <SelectItem value="WA">Washington</SelectItem>
                    <SelectItem value="WV">West Virginia</SelectItem>
                    <SelectItem value="WI">Wisconsin</SelectItem>
                    <SelectItem value="WY">Wyoming</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.state && (
                  <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip / Postal Code *</Label>
              <Input id="zipCode" {...form.register("zipCode")} placeholder="10001" />
              {form.formState.errors.zipCode && (
                <p className="text-sm text-red-500">{form.formState.errors.zipCode.message}</p>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium uppercase">Add Project Details</h3>
            <div className="space-y-2">
              <Label htmlFor="projectDetails">Please provide any additional details about your project</Label>
              <Textarea
                id="projectDetails"
                {...form.register("projectDetails")}
                placeholder="Tell us about your project, including any specific requirements or concerns..."
                className="min-h-[150px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 mt-8 border-t">
        <FancyButton variant="outline" onClick={prevStep} disabled={step === 0}>
          Back
        </FancyButton>
        <FancyButton
          variant={step === STEPS.length - 1 ? "accent" : "default"}
          onClick={nextStep}
          disabled={isSubmitting}
          className={step === STEPS.length - 1 ? "px-8" : ""}
        >
          {isSubmitting ? (
            "Processing..."
          ) : step === STEPS.length - 1 ? (
            "Submit Request"
          ) : (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </FancyButton>
      </div>
    </div>
  )
}
