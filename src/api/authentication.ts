import { FieldValues } from "react-hook-form";
import axios from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_AUTH_URL });
instance.defaults.headers.common["Authorization"] =
  process.env.NEXT_PUBLIC_AUTH_SECRET;

export const login = async (data: FieldValues) => {
  const res = instance.post("/login", {
    params: { email: data.email, password: data.password },
  });

  const result = await res;
  console.log(result);
};

export const signup = async (data: FieldValues) => {
  const res = instance.post("/signup", {
    params: { email: data.email, password: data.password },
  });
  const result = await res;
  console.log(result);
};
