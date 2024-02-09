import { AuthInput } from ".";
import { CurrentUserResponse } from "./current.user.response";

export interface AuthContextValue {
  user: CurrentUserResponse | unknown
  signin: (credentials: AuthInput) => Promise<void>;
  signout: () => Promise<void>;
}
