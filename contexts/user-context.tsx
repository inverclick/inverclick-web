"use client";

import { User } from "@/services/user/get-user-server-side";
import {
  signInClientSide,
  SignInClientSideParams,
} from "@/services/user/sign-in-client-side";
import { signOutClientSide } from "@/services/user/sign-out-client-side";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";

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

  const router = useRouter();

  const signIn = async (params: SignInClientSideParams) => {
    const { error } = await signInClientSide(params);

    if (error) {
      toast.error(error.message);
      return;
    }

    Cookies.remove(PRE_REGISTRATION_COOKIE_NAME);
    localStorage.removeItem(CHATBOT_MESSAGES_LOCAL_STORAGE_KEY);

    /**
     * We're not setting user manually since router.refresh() refresh, in this case /projects page.
     * Projects calls getUserServerSide and the returned user feeds this UserProvider
     */
    router.push("/projects");
    router.refresh();
  };

  const signOut = async () => {
    const { error } = await signOutClientSide();

    if (error) {
      toast.error(error.message);
      return;
    }

    router.refresh();
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
