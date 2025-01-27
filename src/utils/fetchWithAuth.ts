import { auth } from "../firebaseConfig";

export const fetchWithAuth = async (url: string, method: string, token: string | undefined, body?: any) => {

  if (!token) {
    const user = auth.currentUser;
    if (user) {
      try {
        token = await user.getIdToken(true);
        console.log("Refreshed Firebase token:", token);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        throw new Error("No token available or failed to refresh token.");
      }
    }
  }

  if (!token) {
    throw new Error("No token available");
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
};
