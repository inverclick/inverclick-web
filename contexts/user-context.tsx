"use client";

import { signOutAction } from "@/actions/auth/sign-out";
import { User } from "@/services/user/get-user";
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
    signOut,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
