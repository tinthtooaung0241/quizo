const API_URL = "/api/user";

export const postUser = async (userData: {
  userId: string;
  name: string;
  point: number;
  imageUrl: string;
}) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to POST: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
