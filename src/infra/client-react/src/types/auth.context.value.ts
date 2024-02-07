import { AuthInput } from ".";

export interface AuthContextValue {
  signin: (credentials: AuthInput) => Promise<void>;
}
