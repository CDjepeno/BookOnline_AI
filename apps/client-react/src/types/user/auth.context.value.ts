import { AuthFormInput } from "./input.types";
import { CurrentUserResponse } from "./response.types";

export interface AuthContextValue {
  user: CurrentUserResponse | null;
  signin: (credentials: AuthFormInput) => Promise<void>;
  signout: () => Promise<void>;
}
