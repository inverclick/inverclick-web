"use client";

import { signInAction } from "@/actions/auth/sign-in";
import { signOutAction } from "@/actions/auth/sign-out";
import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { User } from "@/services/user/get-user";
import { SignInParams } from "@/services/user/sign-in";
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
  getUserOrThrow: () => User;
  setUser: (user: User | null) => void;
  signIn: (params: SignInParams) => Promise<void>;
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

  const getUserOrThrow = () => {
    if (!user) {
      throw new Error("No user found");
    }

    return user;
  };

  const signIn = async (params: SignInParams) => {
    const { success, message } = await signInAction(params);

    if (!success) {
      toast.error(message);
      return;
    }

    Cookies.remove(PRE_REGISTRATION_COOKIE_NAME);
  };

  const signOut = async () => {
    const { success, message } = await signOutAction();

    if (!success) {
      toast.error(message);
    }
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const context: UserContextType = {
    user,
    getUserOrThrow,
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
