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

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL, {
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
