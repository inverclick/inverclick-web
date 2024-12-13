"use client";

import { PreRegistrationData } from "@/types/pre-registration";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type PreRegistrationContextType = {
  preRegistration: PreRegistrationData | null;
  setPreRegistration: (preRegistration: PreRegistrationData) => void;
  isPreRegistrationOpen: boolean;
  setIsPreRegistrationOpen: (isPreRegistrationOpen: boolean) => void;
  ensurePreRegistration: (callback?: Function) => void;
};

export const PreRegistrationContext = createContext(
  {} as PreRegistrationContextType
);

export type PreRegistrationProviderProps = {
  preRegistration: PreRegistrationData | null;
} & PropsWithChildren;

export const PreRegistrationProvider = ({
  preRegistration: initialPreregistration,
  children,
}: PreRegistrationProviderProps) => {
  const [preRegistration, setPreRegistration] =
    useState<PreRegistrationData | null>(null);

  const [isPreRegistrationOpen, setIsPreRegistrationOpen] = useState(false);

  useEffect(() => {
    setPreRegistration(initialPreregistration);
  }, [initialPreregistration]);

  const ensurePreRegistration = (callback?: Function) => {
    if (!preRegistration) {
      return setIsPreRegistrationOpen(true);
    }

    if (callback) callback();
  };

  const context: PreRegistrationContextType = {
    preRegistration,
    setPreRegistration,
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    ensurePreRegistration,
  };

  return (
    <PreRegistrationContext.Provider value={context}>
      {children}
    </PreRegistrationContext.Provider>
  );
};

export const usePreRegistration = () => {
  return useContext(PreRegistrationContext);
};
