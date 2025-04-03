import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react"; // Ensure this is the correct library for Loader2
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import SuccessModal from "./SuccessModal";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzv2VhnouPc28W5N1LuX-kxbdS72hBgMwml4DATk0fstAlA82bZ_RE9TN4Nau_ETzA-cw/exec";

interface ContactFormProps {
  selectedService: string | null;
}

export default function ContactForm({ selectedService }: ContactFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    if (selectedService) {
      form.setValue("service", selectedService, { shouldValidate: true });
    }
  }, [selectedService, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "no-cors",
      });

      if (!response) {
        throw new Error("Submission failed");
      }

      return { message: "Submission received" };
    },
    onSuccess: () => {
      setIsModalOpen(true);
      form.reset();
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      toast({
        title: t("contact.formError"),
        description: t("contact.formErrorDesc"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto"

      >
        {/* Service Dropdown */}
        <div className="space-y-3">
          <label htmlFor="service" className="block text-sm font-medium text-gray-300">
            {t("contact.service")}
          </label>
          <select
            {...form.register("service")}
            id="service"
            className="block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:border-secondary focus:ring-secondary focus:outline-none p-3"
          >
            <option value="">{t("contact.servicePlaceholder")}</option>
            <option value="schoolProjects">{t("services.schoolProjects")}</option>
            <option value="webdev">{t("services.webdev")}</option>
            <option value="freelance">{t("services.freelance")}</option>
            <option value="security">{t("services.security")}</option>
            <option value="report">{t("services.report")}</option>
            <option value="content">{t("services.content")}</option>
            <option value="seo">{t("services.seo")}</option>
            <option value="thesis">{t("services.thesis")}</option>
            <option value="dissertation">{t("services.dissertation")}</option>
            <option value="presentations">{t("services.presentations")}</option>
            <option value="excel">{t("services.excel")}</option>
            <option value="copywriting">{t("services.copywriting")}</option>
            <option value="dataEntry">{t("services.dataEntry")}</option>
            <option value="aiMlModel">{t("services.cards.aiMlModel.title")}</option> {/* Updated name */}
            <option value="others">{t("services.cards.others.title")}</option>       {/* Updated name */}
          </select>
          <p className="text-sm text-red-500">{form.formState.errors.service?.message}</p>
        </div>

        {/* Full Name Field */}
        <div className="space-y-3">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            {t("contact.fullName")}
          </label>
          <input
            {...form.register("fullName")}
            id="fullName"
            placeholder={t("contact.fullNamePlaceholder")}
            className="block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:border-secondary focus:ring-secondary focus:outline-none p-3"
          />
          <p className="text-sm text-red-500">{form.formState.errors.fullName?.message}</p>
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            {t("contact.email")}
          </label>
          <input
            {...form.register("email")}
            id="email"
            type="email"
            placeholder={t("contact.emailPlaceholder")}
            className="block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:border-secondary focus:ring-secondary focus:outline-none p-3"
          />
          <p className="text-sm text-red-500">{form.formState.errors.email?.message}</p>
        </div>

        {/* Message Field */}
        <div className="space-y-3">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            {t("contact.message")}
          </label>
          <textarea
            {...form.register("message")}
            id="message"
            placeholder={t("contact.messagePlaceholder")}
            rows={5}
            className="block w-full rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:border-secondary focus:ring-secondary focus:outline-none p-3"
          ></textarea>
          <p className="text-sm text-red-500">{form.formState.errors.message?.message}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-secondary text-primary font-medium transition-all hover:bg-opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 relative overflow-hidden"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("contact.submitting")}
            </div>
          ) : (
            t("contact.submit")
          )}
        </button>

        <p className="text-sm text-gray-400 text-center">{t("contact.confirmation")}</p>
      </form>
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}