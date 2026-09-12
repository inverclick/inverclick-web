"use client";

import { useUser } from "@/contexts/user-context";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

export type WelcomeDialogVariant = "new" | "existing";

export type PreRegistrationContextType = {
  isPreRegistrationOpen: boolean;
  setIsPreRegistrationOpen: (isPreRegistrationOpen: boolean) => void;
  welcomeDialogOpen: boolean;
  setWelcomeDialogOpen: (welcomeDialogOpen: boolean) => void;
  welcomeDialogVariant: WelcomeDialogVariant;
  setWelcomeDialogVariant: (variant: WelcomeDialogVariant) => void;
  canInteractWithFeatures: boolean;
};

export const PreRegistrationContext = createContext(
  {} as PreRegistrationContextType
);

export type PreRegistrationProviderProps = {
  isPreRegistrationOpen?: boolean;
} & PropsWithChildren;

export const PreRegistrationProvider = ({
  isPreRegistrationOpen: initialIsPreRegistrationOpen = false,
  children,
}: PreRegistrationProviderProps) => {
  const [isPreRegistrationOpen, setIsPreRegistrationOpen] = useState(
    initialIsPreRegistrationOpen
  );

  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false);
  const [welcomeDialogVariant, setWelcomeDialogVariant] =
    useState<WelcomeDialogVariant>("new");

  const { user } = useUser();

  /**
   * Every entry point of the client flow — the "Ver información" dialog,
   * /auth/sign-up and /auth/sign-in — now ends in a real Supabase session, so
   * the session is the only thing that unlocks the project features. Signing
   * out re-locks them on its own, with no pre-registration cookie left to
   * clean up.
   */
  const canInteractWithFeatures = Boolean(user);

  const context = useMemo(
    () => ({
      isPreRegistrationOpen,
      setIsPreRegistrationOpen,
      welcomeDialogOpen,
      setWelcomeDialogOpen,
      welcomeDialogVariant,
      setWelcomeDialogVariant,
      canInteractWithFeatures,
    }),
    [
      isPreRegistrationOpen,
      welcomeDialogOpen,
      welcomeDialogVariant,
      canInteractWithFeatures,
    ]
  );

  return (
    <PreRegistrationContext.Provider value={context}>
      {children}
    </PreRegistrationContext.Provider>
  );
};

export const usePreRegistration = () => {
  return useContext(PreRegistrationContext);
};
