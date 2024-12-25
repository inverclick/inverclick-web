"use client";

import { useUser } from "@/contexts/user-context";
import { PreRegistration } from "@/types/pre-registration";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PreRegistrationContextType = {
  preRegistration: PreRegistration | null;
  setPreRegistration: (preRegistration: PreRegistration) => void;
  isPreRegistrationOpen: boolean;
  setIsPreRegistrationOpen: (isPreRegistrationOpen: boolean) => void;
  welcomeDialogOpen: boolean;
  setWelcomeDialogOpen: (welcomeDialogOpen: boolean) => void;
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

  const { user } = useUser();

  useEffect(() => {
    setPreRegistration(initialPreRegistration);
  }, [initialPreRegistration]);

  const canInteractWithFeatures = Boolean(preRegistration) || Boolean(user);

  const context = useMemo(
    () => ({
      preRegistration,
      setPreRegistration,
      isPreRegistrationOpen,
      setIsPreRegistrationOpen,
      welcomeDialogOpen,
      setWelcomeDialogOpen,
      canInteractWithFeatures,
    }),
    [
      preRegistration,
      setPreRegistration,
      isPreRegistrationOpen,
      setIsPreRegistrationOpen,
      welcomeDialogOpen,
      setWelcomeDialogOpen,
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
