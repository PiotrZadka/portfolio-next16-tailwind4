import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ConsoleNav } from "@/components/layout/ConsoleNav";
import { Footer } from "@/components/layout/Footer";
import { getContact } from "@/lib/sanity";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const [messages, contact] = await Promise.all([
    getMessages(),
    getContact(locale),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ConsoleNav />
      {children}
      <Footer contact={contact} />
    </NextIntlClientProvider>
  );
}
