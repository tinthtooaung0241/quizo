import { User } from "@/types/travia";
import { auth } from "@clerk/nextjs/server";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`;

export const postUser = async (userData: {
  userId: string;
  name: string;
  point: number;
  imageUrl: string;
}) => {
  try {
    const response = await fetch(API_URL, {
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

export async function getUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array or some default data
  }
}

export const getUser = async (userId: string): Promise<number> => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
