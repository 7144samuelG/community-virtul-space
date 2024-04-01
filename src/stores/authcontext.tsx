
import {authSubscribe } from "@junobuild/core";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
interface AuthContextType {
  user: string;
}
const AuthContext = createContext<AuthContextType>({
  user: "",
});
interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    
    const sub = authSubscribe((user) => setUser(user ? user.toString() : ""));
    return () => sub();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
