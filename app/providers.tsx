"use client";

import { DownloadApp } from "@/components/shared/download-app";
import { YupLocalization } from "@/components/shared/yup-localization/yup-localization";
import { CreditRatesProvider } from "@/contexts/credit-rates-context";
import { CurrencyProvider } from "@/contexts/currency-context";
import { FavoritesProvider } from "@/contexts/favorites-context";
import {
  PreRegistrationProvider,
  usePreRegistration,
} from "@/contexts/pre-registration-context";
import { UserProvider } from "@/contexts/user-context";
import { CreditRates } from "@/lib/credit-rates";
import { User } from "@/services/user/get-user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

// The sign-up and welcome dialogs bring formik, the phone input and confetti.
// Download them only when one of them opens, not with every page.
const PreRegistration = dynamic(
  () =>
    import("@/components/shared/pre-registration/pre-registration").then(
      (m) => m.PreRegistration
    ),
  { ssr: false }
);
const WelcomeDialog = dynamic(
  () =>
    import("@/components/shared/pre-registration/welcome-dialog").then(
      (m) => m.WelcomeDialog
    ),
  { ssr: false }
);

function PreRegistrationDialogs() {
  const { isPreRegistrationOpen, welcomeDialogOpen } = usePreRegistration();
  return (
    <>
      {welcomeDialogOpen && <WelcomeDialog />}
      {isPreRegistrationOpen && <PreRegistration />}
    </>
  );
}

export type ProvidersProps = PropsWithChildren<{
  user: User | null;
  TRM_USD: number;
  TRM_EUR: number;
  last_trm_update: number;
  creditRates: CreditRates;
}>;

export function Providers({
  user,
  TRM_EUR,
  TRM_USD,
  last_trm_update,
  creditRates,
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
            <CreditRatesProvider rates={creditRates}>
              <PreRegistrationProvider>
                <FavoritesProvider>
                  <YupLocalization>
                    {children}
                    <PreRegistrationDialogs />
                    <Toaster closeButton />
                    <DownloadApp />
                  </YupLocalization>
                </FavoritesProvider>
              </PreRegistrationProvider>
            </CreditRatesProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
