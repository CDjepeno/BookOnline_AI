import { getCurrentUser } from "../api/current.user";

export async function rootLoader() {
  return getCurrentUser();
}


