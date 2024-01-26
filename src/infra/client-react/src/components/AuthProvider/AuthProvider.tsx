import { PropsWithChildren, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context";
import LoginHook from "../../pages/login/login.hook";
import { AuthInput } from "../../types";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);

  const { onSubmit } = LoginHook();

  async function signin(credentials: AuthInput) {
    const newUser = await onSubmit(credentials);
    setUser(newUser);
  }

  return (
    <AuthContext.Provider value={{ user, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
