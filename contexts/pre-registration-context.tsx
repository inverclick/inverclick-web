"use client";

import { PreRegistration } from "@/types/pre-registration";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type PreRegistrationContextType = {
  preRegistration: PreRegistration | null;
  setPreRegistration: (preRegistration: PreRegistration) => void;
  isPreRegistrationOpen: boolean;
  setIsPreRegistrationOpen: (isPreRegistrationOpen: boolean) => void;
  ensurePreRegistration: (callback?: Function) => void;
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

  useEffect(() => {
    setPreRegistration(initialPreRegistration);
  }, [initialPreRegistration]);

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
