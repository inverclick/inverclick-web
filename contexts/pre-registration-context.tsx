"use client";

import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { useUser } from "@/contexts/user-context";
import { PreRegistration } from "@/types/pre-registration";
import Cookies from "js-cookie";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type WelcomeDialogVariant = "new" | "existing";

export type PreRegistrationContextType = {
  preRegistration: PreRegistration | null;
  setPreRegistration: (preRegistration: PreRegistration) => void;
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
  preRegistration: PreRegistration | null;
  isPreRegistrationOpen?: boolean;
} & PropsWithChildren;

export const PreRegistrationProvider = ({
  preRegistration: initialPreRegistration,
  isPreRegistrationOpen: initialIsPreRegistrationOpen = false,
  children,
}: PreRegistrationProviderProps) => {
  const [preRegistration, setPreRegistration] =
    useState<PreRegistration | null>(initialPreRegistration);

  const [isPreRegistrationOpen, setIsPreRegistrationOpen] = useState(
    initialIsPreRegistrationOpen
  );

  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false);
  const [welcomeDialogVariant, setWelcomeDialogVariant] =
    useState<WelcomeDialogVariant>("new");

  const { user } = useUser();
  const previousUserRef = useRef(user);

  useEffect(() => {
    setPreRegistration(initialPreRegistration);
  }, [initialPreRegistration]);

  /**
   * If a real session existed and just ended (logout), drop any leftover
   * pre-registration state so features re-lock instead of staying unlocked
   * forever from a stale client-side pre-registration.
   */
  useEffect(() => {
    if (previousUserRef.current && !user) {
      setPreRegistration(null);
      Cookies.remove(PRE_REGISTRATION_COOKIE_NAME);
    }

    previousUserRef.current = user;
  }, [user]);

  const canInteractWithFeatures = Boolean(preRegistration) || Boolean(user);

  const context = useMemo(
    () => ({
      preRegistration,
      setPreRegistration,
      isPreRegistrationOpen,
      setIsPreRegistrationOpen,
      welcomeDialogOpen,
      setWelcomeDialogOpen,
      welcomeDialogVariant,
      setWelcomeDialogVariant,
      canInteractWithFeatures,
    }),
    [
      preRegistration,
      setPreRegistration,
      isPreRegistrationOpen,
      setIsPreRegistrationOpen,
      welcomeDialogOpen,
      setWelcomeDialogOpen,
      welcomeDialogVariant,
      setWelcomeDialogVariant,
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
