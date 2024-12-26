"use client";

import { signInAction } from "@/actions/auth/sign-in";
import { signOutAction } from "@/actions/auth/sign-out";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";
import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { User } from "@/services/user/get-user-server-side";
import { SignInClientSideParams } from "@/services/user/sign-in-client-side";
import Cookies from "js-cookie";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (params: SignInClientSideParams) => Promise<void>;
  signOut: () => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);

export type UserContextProps = PropsWithChildren<{
  user: User | null;
}>;

export const UserProvider = ({
  user: initialUser,
  children,
}: UserContextProps) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const signIn = async (params: SignInClientSideParams) => {
    try {
      await signInAction(params);

      Cookies.remove(PRE_REGISTRATION_COOKIE_NAME);
      localStorage.removeItem(CHATBOT_MESSAGES_LOCAL_STORAGE_KEY);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const signOut = async () => {
    try {
      await signOutAction();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const context: UserContextType = {
    user,
    setUser,
    signIn,
    signOut,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
