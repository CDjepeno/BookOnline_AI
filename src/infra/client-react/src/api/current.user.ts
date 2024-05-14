import axios from "axios";
import { CurrentUserResponse } from "../types/current.user.response";

export async function getCurrentUser(): Promise<CurrentUserResponse | null> {
  const storedValue = localStorage.getItem("BookToken");
  const parsedObject = JSON.parse(storedValue as string);
  try {
    const response = await axios.get<CurrentUserResponse>(
      "http://localhost:3000/auth/current",
      {
        headers: {
          Authorization: `Bearer ${parsedObject}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de l'utilisateur actuel :",
      error
    );
    throw error;
  }
}
