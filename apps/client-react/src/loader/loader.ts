import { getCurrentUser } from "../api/current.user";

export async function rootLoader() {
  try {
    const data = await getCurrentUser();
    return data
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors du chargement des données de l'utilisateur :",
      error
    );
    return null;
  }
}
