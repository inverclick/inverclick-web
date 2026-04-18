"use client";

import { Chatbot } from "@/components/shared/chatbot/chatbot";
import { DownloadApp } from "@/components/shared/download-app";
import { PreRegistration } from "@/components/shared/pre-registration/pre-registration";
import { WelcomeDialog } from "@/components/shared/pre-registration/welcome-dialog";
import { YupLocalization } from "@/components/shared/yup-localization/yup-localization";
import { CurrencyProvider } from "@/contexts/currency-context";
import { PreRegistrationProvider } from "@/contexts/pre-registration-context";
import { UserProvider } from "@/contexts/user-context";
import { User } from "@/services/user/get-user";
import { PreRegistration as PreRegistrationType } from "@/types/pre-registration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export type ProvidersProps = PropsWithChildren<{
  user: User | null;
  TRM_USD: number;
  TRM_EUR: number;
  last_trm_update: number;
  preRegistration: PreRegistrationType | null;
}>;

export function Providers({
  user,
  TRM_EUR,
  TRM_USD,
  last_trm_update,
  preRegistration,
  children,
}: ProvidersProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserProvider user={user}>
        <ThemeProvider defaultTheme="light">
          <CurrencyProvider
            TRM_USD={TRM_USD}
            TRM_EUR={TRM_EUR} 
            last_trm_update={last_trm_update}
            currency="COP"
          >
            <PreRegistrationProvider preRegistration={preRegistration}>
              <YupLocalization>
                {children}
                <Chatbot />
                <WelcomeDialog />
                <PreRegistration />
                <Toaster closeButton />
                <DownloadApp />
              </YupLocalization>
            </PreRegistrationProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
