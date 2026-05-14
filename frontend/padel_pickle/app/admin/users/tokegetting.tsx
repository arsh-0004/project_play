import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/admin.venues.types";

export const getDecodedToken = (): DecodedToken | null => {
  // Prevent SSR/localStorage error
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.log("Invalid token", error);
    return null;
  }
};