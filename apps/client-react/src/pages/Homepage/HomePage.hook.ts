import axios from "axios";
import { useEffect, useState } from "react";
import { BookI } from "../../interfaces";

export default function HomePageHook() {
  const [books, setBooks] = useState<BookI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get<BookI[]>(
          "http://localhost:3000/getbooks"
        );
        if (response.status !== 200) {
          throw new Error(`Erreur ${response.status}`);
        }

        if (!Array.isArray(response.data)) {
          throw new Error("Erreur : format de données invalide");
        }
        setBooks(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.message || "Erreur de reponse du serveur"
          );
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur est survenue");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);
  return { books, setBooks, isLoading, error };
}
