import { FieldValues } from "react-hook-form";
import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_AUTH_URL });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Caught a 401");
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

export const login = async (data: FieldValues): Promise<{ token: string }> => {
  const res = instance.post("/login", {
    email: data.email,
    password: data.password,
  });

  const result = await res;
  console.log(result);
  return result as unknown as { token: string };
};

export const signup = async (data: FieldValues) => {
  const res = instance.post("/signup", {
    email: data.email,
    password: data.password,
  });
  const result = await res;
  console.log(result);
  return result;
};
