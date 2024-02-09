import axios from "axios";
import { CurrentUserResponse } from "../types/current.user.response";

export const getCurrentUser = async (): Promise<
  CurrentUserResponse | unknown
> => {
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
    console.error("An error occurred while fetching current user:", error);
    throw error;
  }
};
