import { FieldValues } from "react-hook-form";
import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_AUTH_URL });

export const login = async (data: FieldValues) => {
  const res = instance.post("/login", {
    email: data.email,
    password: data.password,
  });

  const result = await res;
  console.log(result);
};

export const signup = async (data: FieldValues) => {
  const res = instance.post("/signup", {
    email: data.email,
    password: data.password,
  });
  const result = await res;
  console.log(result);
};
